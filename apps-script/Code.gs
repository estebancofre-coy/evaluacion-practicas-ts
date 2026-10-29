const CONFIG = Object.freeze({
  adminSessionPrefix: "achetsu-admin-session-",
  adminSessionSeconds: 2 * 60 * 60,
  adminMaxFailedLogins: 5,
  adminLockoutSeconds: 15 * 60,
  passwordHashIterations: 3000,
  requestSheet: "Solicitudes",
  memberSheet: "Socios",
  challengePrefix: "achetsu-totp-",
  challengeLifetimeSeconds: 600,
  maxAttachmentBytes: 5 * 1024 * 1024,
  maxSearchResults: 8
});

const REQUEST_HEADERS = [
  "ID", "Fecha", "Estado", "Categoría", "Tipo", "ID socio",
  "Nombre", "Correo", "Teléfono", "Universidad", "Cambios solicitados",
  "ID archivo", "Nombre archivo", "Habilitado 2026",
  "Revisado por", "Fecha revisión", "Nota administrativa"
];

const MEMBER_HEADERS = [
  "ID", "Categoría", "Apellidos", "Nombre completo", "Correo",
  "Universidad", "Habilitado 2026", "Actualizado"
];

function doGet(event) {
  const view = event && event.parameter ? event.parameter.view : "";
  if (view === "admin") {
    const template = HtmlService.createTemplateFromFile("Admin");
    template.publicUrl = PropertiesService.getScriptProperties().getProperty("ACHETSU_PUBLIC_WEB_APP_URL") || "";
    return template.evaluate().setTitle("Revisión de solicitudes · ACHETSU");
  }
  if (view === "directory") {
    const template = HtmlService.createTemplateFromFile("Directory");
    template.appUrl = PropertiesService.getScriptProperties().getProperty("ACHETSU_PUBLIC_WEB_APP_URL") || "";
    return template.evaluate()
      .setTitle("Consulta del padrón · ACHETSU")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  if (view === "intake") {
    const template = HtmlService.createTemplateFromFile("Intake");
    template.appUrl = PropertiesService.getScriptProperties().getProperty("ACHETSU_PUBLIC_WEB_APP_URL") || "";
    template.memberId = event.parameter.memberId || "";
    template.category = event.parameter.category || "";
    template.requestType = event.parameter.requestType || "";
    return template.evaluate().setTitle("Solicitud de actualización · ACHETSU");
  }
  return HtmlService.createHtmlOutput("Aplicación de solicitudes de ACHETSU.")
    .setTitle("ACHETSU");
}

function initializeBackend() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty("ACHETSU_SPREADSHEET_ID");
  let folderId = properties.getProperty("ACHETSU_PRIVATE_FOLDER_ID");

  if (!spreadsheetId) {
    const spreadsheet = SpreadsheetApp.create("ACHETSU · solicitudes y padrón");
    spreadsheetId = spreadsheet.getId();
    properties.setProperty("ACHETSU_SPREADSHEET_ID", spreadsheetId);
  }

  if (!folderId) {
    const folder = DriveApp.createFolder("ACHETSU · antecedentes pendientes de revisión");
    folderId = folder.getId();
    properties.setProperty("ACHETSU_PRIVATE_FOLDER_ID", folderId);
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  ensureSheet_(spreadsheet, CONFIG.requestSheet, REQUEST_HEADERS);
  ensureSheet_(spreadsheet, CONFIG.memberSheet, MEMBER_HEADERS);
  return {
    spreadsheetUrl: spreadsheet.getUrl(),
    privateFolderUrl: DriveApp.getFolderById(folderId).getUrl()
  };
}

function beginTotpChallenge(emailInput) {
  const email = cleanText_(emailInput, 254).toLowerCase();
  if (!isValidEmail_(email)) throw new Error("Ingresa un correo válido antes de iniciar la verificación.");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const cache = CacheService.getScriptCache();
    const rateKey = "achetsu-totp-rate-" + hashText_(email);
    const attempts = Number(cache.get(rateKey) || 0);
    if (attempts >= 3) throw new Error("Se alcanzó el límite de verificaciones para este correo. Intenta nuevamente en 10 minutos.");
    cache.put(rateKey, String(attempts + 1), CONFIG.challengeLifetimeSeconds);

    const secret = createTotpSecret_();
    const challengeId = Utilities.getUuid();
    const expiresAt = Date.now() + CONFIG.challengeLifetimeSeconds * 1000;
    const payload = JSON.stringify({
      secret: secret,
      email: email,
      createdAt: Date.now(),
      expiresAt: expiresAt,
      failedAttempts: 0,
      lastAcceptedStep: -1
    });
    cache.put(CONFIG.challengePrefix + challengeId, payload, CONFIG.challengeLifetimeSeconds);
    return {
      challengeId: challengeId,
      secret: secret,
      issuer: "ACHETSU",
      lifetimeSeconds: CONFIG.challengeLifetimeSeconds
    };
  } finally {
    lock.releaseLock();
  }
}

function submitRequest(form) {
  if (!form) throw new Error("No se recibió la solicitud.");

  const challengeId = cleanText_(form.challengeId, 80);
  const cache = CacheService.getScriptCache();
  const cacheKey = CONFIG.challengePrefix + challengeId;
  const category = cleanText_(form.category, 30);
  const requestType = cleanText_(form.requestType, 30);
  const memberId = cleanText_(form.memberId, 80);
  const surname = cleanText_(form.surname, 160);
  const givenName = cleanText_(form.givenName, 160);
  const email = cleanText_(form.email, 254).toLowerCase();
  const phone = cleanText_(form.phone, 40);
  const university = cleanText_(form.university, 180);
  const description = cleanText_(form.description, 2500);
  const consent = form.consent === "on";

  if (!["naturales", "institucionales"].includes(category)) throw new Error("Selecciona una categoría de socio.");
  if (!["rectificacion", "incorporacion"].includes(requestType)) throw new Error("Selecciona el tipo de solicitud.");
  if (!surname || !givenName || !isValidEmail_(email) || !isValidPhone_(phone) || !university || !description) {
    throw new Error("Completa apellidos, nombre, correo, teléfono, universidad y cambios solicitados.");
  }
  if (!consent) throw new Error("Debes confirmar que autorizas la revisión administrativa de esta solicitud.");
  if (form.website) throw new Error("No se pudo procesar la solicitud.");
  const details = JSON.stringify({ surname, givenName, email, university, description });

  const isUpdate = requestType === "rectificacion";
  if (isUpdate && !memberId) throw new Error("Selecciona el registro que deseas rectificar.");
  if (!isUpdate && memberId) throw new Error("Una incorporación nueva no debe incluir un ID de socio.");
  const attachment = form.attachment;
  validateAttachment_(attachment);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  let uploadedFile = null;
  let requestStored = false;
  try {
    const challengeText = cache.get(cacheKey);
    if (!challengeText) throw new Error("El código venció o ya fue utilizado. Inicia de nuevo la verificación.");
    const challenge = JSON.parse(challengeText);
    if (challenge.email !== email) throw new Error("El correo cambió después de iniciar la verificación. Inicia una nueva verificación.");
    if (!verifyTotp_(challenge.secret, cleanText_(form.totpCode, 6), challenge.lastAcceptedStep)) {
      challenge.failedAttempts = Number(challenge.failedAttempts || 0) + 1;
      const expiresAt = Number(challenge.expiresAt) || 0;
      const remainingSeconds = Math.ceil((expiresAt - Date.now()) / 1000);
      if (challenge.failedAttempts >= 5 || remainingSeconds <= 0) {
        cache.remove(cacheKey);
        throw new Error("Se agotaron los intentos o venció la verificación. Inicia una nueva verificación.");
      } else {
        cache.put(cacheKey, JSON.stringify(challenge), remainingSeconds);
      }
      throw new Error("El código no es válido. Revisa la hora de tu teléfono e inténtalo otra vez.");
    }
    cache.remove(cacheKey);

    const existingMember = isUpdate ? findMember_(memberId, category) : null;
    if (isUpdate && !existingMember) {
      throw new Error("No se encontró el registro indicado. Vuelve al padrón y selecciónalo nuevamente.");
    }

    const requestId = Utilities.getUuid();
    const timestamp = new Date();
    const folder = DriveApp.getFolderById(getRequiredProperty_("ACHETSU_PRIVATE_FOLDER_ID"));
    const safeFileName = sanitizeFileName_(attachment.getName());
    uploadedFile = folder.createFile(attachment.copyBlob().setName(requestId + "-" + safeFileName));

    const requestSheet = getSheet_(CONFIG.requestSheet);
    requestSheet.appendRow([
      requestId, timestamp, "Pendiente", category, requestType, safeSheetText_(memberId),
      safeSheetText_([surname, givenName].join(", ")),
      safeSheetText_(email), safeSheetText_(phone), safeSheetText_(university), details,
      uploadedFile.getId(), safeSheetText_(safeFileName),
      existingMember ? existingMember.eligible2026 : false,
      "", "", ""
    ]);
    requestStored = true;

    return {
      requestId: requestId,
      message: "Solicitud recibida. Los datos y documentos quedan pendientes de revisión administrativa."
    };
  } catch (error) {
    if (uploadedFile && !requestStored) uploadedFile.setTrashed(true);
    throw error;
  } finally {
    lock.releaseLock();
  }
}

function searchMembers(category, query) {
  const normalizedCategory = cleanText_(category, 30);
  const normalizedQuery = normalizeText_(cleanText_(query, 100));
  if (!["naturales", "institucionales"].includes(normalizedCategory)) {
    throw new Error("Selecciona un padrón válido.");
  }
  if (normalizedQuery.length < 2) return [];

  const sheet = getSheet_(CONFIG.memberSheet);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const results = [];
  for (let row = 1; row < values.length && results.length < CONFIG.maxSearchResults; row += 1) {
    const member = memberFromRow_(values[row]);
    if (member.category !== normalizedCategory) continue;
    const searchable = normalizeText_(member.surname + " " + member.givenName);
    if (searchable.includes(normalizedQuery)) results.push(publicMember_(member));
  }
  return results;
}

function getPublicMember(memberId, category) {
  const member = findMember_(cleanText_(memberId, 80), cleanText_(category, 30));
  if (!member) return null;
  return publicMember_(member);
}

function secureAdminPassword() {
  const properties = PropertiesService.getScriptProperties();
  const user = cleanText_(properties.getProperty("ACHETSU_ADMIN_USER"), 80);
  const password = String(properties.getProperty("ACHETSU_ADMIN_PASSWORD") || "");
  if (!user) throw new Error("Agrega la propiedad ACHETSU_ADMIN_USER en Configuración del proyecto > Propiedades del script.");
  if (password.length < 8) throw new Error("Agrega la propiedad ACHETSU_ADMIN_PASSWORD (mínimo 8 caracteres) antes de ejecutar esta función.");
  const salt = Utilities.getUuid();
  properties.setProperties({
    ACHETSU_ADMIN_PASSWORD_SALT: salt,
    ACHETSU_ADMIN_PASSWORD_HASH: hashPassword_(password, salt)
  });
  properties.deleteProperty("ACHETSU_ADMIN_PASSWORD");
  return "Contraseña protegida para el usuario " + user + ". La propiedad en texto plano fue eliminada.";
}

function adminLogin(userInput, passwordInput) {
  const user = cleanText_(userInput, 80);
  const password = String(passwordInput || "").slice(0, 200);
  const properties = PropertiesService.getScriptProperties();
  const expectedUser = cleanText_(properties.getProperty("ACHETSU_ADMIN_USER"), 80);
  const salt = properties.getProperty("ACHETSU_ADMIN_PASSWORD_SALT");
  const expectedHash = properties.getProperty("ACHETSU_ADMIN_PASSWORD_HASH");
  if (!expectedUser || !salt || !expectedHash) {
    throw new Error("El acceso administrativo no está configurado. Ejecuta secureAdminPassword() desde el editor.");
  }

  const cache = CacheService.getScriptCache();
  const failureKey = "achetsu-admin-failures";
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const failures = Number(cache.get(failureKey) || 0);
    if (failures >= CONFIG.adminMaxFailedLogins) {
      throw new Error("Demasiados intentos fallidos. Espera 15 minutos antes de volver a intentar.");
    }
    const validUser = user.toLowerCase() === expectedUser.toLowerCase();
    const validPassword = constantTimeEquals_(hashPassword_(password, salt), expectedHash);
    if (!validUser || !validPassword) {
      cache.put(failureKey, String(failures + 1), CONFIG.adminLockoutSeconds);
      throw new Error("Usuario o contraseña incorrectos.");
    }
    cache.remove(failureKey);
    const token = Utilities.getUuid() + Utilities.getUuid();
    cache.put(CONFIG.adminSessionPrefix + hashText_(token), expectedUser, CONFIG.adminSessionSeconds);
    return { token: token, user: expectedUser, expiresInSeconds: CONFIG.adminSessionSeconds };
  } finally {
    lock.releaseLock();
  }
}

function adminLogout(token) {
  const value = String(token || "");
  if (value) CacheService.getScriptCache().remove(CONFIG.adminSessionPrefix + hashText_(value));
  return { loggedOut: true };
}

function getAttachment(token, requestId) {
  requireAdmin_(token);
  const id = cleanText_(requestId, 80);
  const row = getSheet_(CONFIG.requestSheet).getDataRange().getValues()
    .find((candidate, index) => index > 0 && String(candidate[0]) === id);
  if (!row || !row[11]) throw new Error("La solicitud no tiene antecedentes adjuntos.");
  const blob = DriveApp.getFileById(String(row[11])).getBlob();
  return {
    name: unescapeSheetText_(row[12]) || blob.getName(),
    mimeType: blob.getContentType(),
    data: Utilities.base64Encode(blob.getBytes())
  };
}

function listPendingRequests(token) {
  requireAdmin_(token);
  const sheet = getSheet_(CONFIG.requestSheet);
  const values = sheet.getDataRange().getValues();
  const memberSheet = getSheet_(CONFIG.memberSheet);
  const membersById = new Map(memberSheet.getDataRange().getValues().slice(1).map((row) => {
    const member = memberFromRow_(row);
    return [member.id, member];
  }));
  return values.slice(1)
    .filter((row) => row[2] === "Pendiente")
    .map((row) => {
      const changes = parseChangeDetails_(String(row[10] || "")) || {};
      const currentMember = membersById.get(unescapeSheetText_(row[5])) || null;
      return {
        id: String(row[0]),
        date: row[1] instanceof Date ? row[1].toISOString() : String(row[1]),
        category: unescapeSheetText_(row[3]),
        requestType: String(row[4]),
        memberId: unescapeSheetText_(row[5]),
        fullName: unescapeSheetText_(row[6]),
        email: unescapeSheetText_(row[7]),
        phone: unescapeSheetText_(row[8]),
        university: unescapeSheetText_(row[9]),
        details: String(changes.description || ""),
        proposed: {
          surname: String(changes.surname || ""),
          givenName: String(changes.givenName || ""),
          email: String(changes.email || ""),
          university: String(changes.university || "")
        },
        currentMember: currentMember ? publicMember_(currentMember) : null,
        hasAttachment: Boolean(row[11]),
        attachmentName: unescapeSheetText_(row[12]),
        eligible2026: row[13] === true
      };
    });
}

function reviewRequest(token, requestId, decision, note, eligible2026) {
  const adminUser = requireAdmin_(token);
  const id = cleanText_(requestId, 80);
  const action = cleanText_(decision, 20);
  if (!["Aprobada", "Rechazada"].includes(action)) throw new Error("La decisión no es válida.");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_(CONFIG.requestSheet);
    const values = sheet.getDataRange().getValues();
    const rowIndex = values.findIndex((row, index) => index > 0 && String(row[0]) === id);
    if (rowIndex < 1) throw new Error("No se encontró la solicitud.");
    const row = values[rowIndex];
    if (row[2] !== "Pendiente") throw new Error("Esta solicitud ya fue revisada.");

    if (action === "Aprobada") {
      applyApprovedRequest_(row, eligible2026 === true);
    }
    sheet.getRange(rowIndex + 1, 3).setValue(action);
    sheet.getRange(rowIndex + 1, 14).setValue(action === "Aprobada" && eligible2026 === true);
    sheet.getRange(rowIndex + 1, 15, 1, 3).setValues([[
      safeSheetText_(adminUser), new Date(), safeSheetText_(cleanText_(note, 2000))
    ]]);
    return { status: action };
  } finally {
    lock.releaseLock();
  }
}

function importDirectory(token, jsonText) {
  requireAdmin_(token);
  const text = cleanText_(jsonText, 200000);
  let records;
  try {
    records = JSON.parse(text);
  } catch (error) {
    throw new Error("El archivo no contiene un JSON válido.");
  }
  if (!Array.isArray(records) || records.length > 2000) throw new Error("El archivo debe ser un listado válido de hasta 2000 registros.");

  const rows = records.map((record, index) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      throw new Error("El registro " + (index + 1) + " no tiene un formato válido.");
    }
    const category = cleanText_(record.category, 30);
    if (!["naturales", "institucionales"].includes(category)) {
      throw new Error("El registro " + (index + 1) + " tiene una categoría no válida.");
    }
    return [
      safeSheetText_(cleanText_(record.id, 80) || Utilities.getUuid()),
      safeSheetText_(category),
      safeSheetText_(cleanText_(record.surname, 160)),
      safeSheetText_(cleanText_(record.givenName, 160)),
      safeSheetText_(cleanText_(record.email, 254).toLowerCase()),
      safeSheetText_(cleanText_(record.university, 180)),
      record.eligible2026 === true,
      new Date()
    ];
  });
  if (rows.some((row) => !row[2] || !row[3])) throw new Error("Cada registro debe incluir apellidos y nombre.");
  if (new Set(rows.map((row) => row[0])).size !== rows.length) {
    throw new Error("El padrón contiene IDs duplicados. Corrige el archivo antes de importar.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_(CONFIG.memberSheet);
    sheet.clearContents();
    sheet.getRange(1, 1, 1, MEMBER_HEADERS.length).setValues([MEMBER_HEADERS]);
    if (rows.length) sheet.getRange(2, 1, rows.length, MEMBER_HEADERS.length).setValues(rows);
  } finally {
    lock.releaseLock();
  }
  return { imported: rows.length };
}

function savePublicWebAppUrl(token, url) {
  requireAdmin_(token);
  const value = cleanText_(url, 300);
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(value)) {
    throw new Error("Ingresa la URL /exec del despliegue público de Google Apps Script.");
  }
  PropertiesService.getScriptProperties().setProperty("ACHETSU_PUBLIC_WEB_APP_URL", value);
  return { saved: true };
}

function hashText_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value)
    .map((byte) => (byte & 255).toString(16).padStart(2, "0"))
    .join("");
}

function applyApprovedRequest_(row, eligible2026) {
  const sheet = getSheet_(CONFIG.memberSheet);
  const category = unescapeSheetText_(row[3]);
  const requestType = String(row[4]);
  const memberId = unescapeSheetText_(row[5]);
  if (!["naturales", "institucionales"].includes(category) ||
      !["rectificacion", "incorporacion"].includes(requestType)) {
    throw new Error("La solicitud contiene una categoría o tipo no válido; no se aplicaron cambios.");
  }
  if (requestType === "incorporacion" && memberId) {
    throw new Error("Una incorporación nueva no puede reemplazar un registro existente.");
  }
  const existing = memberId ? findMemberRow_(memberId, category) : null;

  if (requestType === "rectificacion" && !existing) {
    throw new Error("El registro original ya no existe; no se puede aprobar la rectificación.");
  }

  const proposed = {
    surname: "",
    givenName: "",
    email: "",
    university: ""
  };
  const parsedDetails = parseChangeDetails_(String(row[10] || ""));
  if (!parsedDetails ||
      !parsedDetails.surname ||
      !parsedDetails.givenName ||
      !isValidEmail_(parsedDetails.email) ||
      !parsedDetails.university) {
    throw new Error("La solicitud no contiene los datos de padrón requeridos; no se aplicaron cambios.");
  }
  proposed.surname = parsedDetails.surname;
  proposed.givenName = parsedDetails.givenName;
  proposed.email = parsedDetails.email;
  proposed.university = parsedDetails.university;

  const targetId = existing ? memberId : Utilities.getUuid();
  const data = [
    safeSheetText_(targetId), safeSheetText_(category),
    safeSheetText_(proposed.surname), safeSheetText_(proposed.givenName),
    safeSheetText_(proposed.email), safeSheetText_(proposed.university), eligible2026, new Date()
  ];

  if (existing) {
    sheet.getRange(existing.row, 1, 1, MEMBER_HEADERS.length).setValues([data]);
  } else {
    sheet.appendRow(data);
  }
}

function parseChangeDetails_(text) {
  try {
    const data = JSON.parse(text);
    return {
      surname: cleanText_(data.surname, 160),
      givenName: cleanText_(data.givenName, 160),
      email: cleanText_(data.email, 254).toLowerCase(),
      university: cleanText_(data.university, 180),
      description: cleanText_(data.description, 2500)
    };
  } catch (error) {
    return null;
  }
}

function createTotpSecret_() {
  const hex = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, "");
  const bytes = [];
  for (let index = 0; index < hex.length; index += 2) {
    bytes.push(parseInt(hex.slice(index, index + 2), 16));
  }
  return base32Encode_(bytes.slice(0, 20));
}

function base32Encode_(bytes) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let output = "";
  let buffer = 0;
  let bits = 0;
  bytes.forEach((value) => {
    buffer = (buffer << 8) | (value & 255);
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(buffer >>> (bits - 5)) & 31];
      bits -= 5;
    }
  });
  if (bits > 0) output += alphabet[(buffer << (5 - bits)) & 31];
  return output;
}

function base32Decode_(secret) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const output = [];
  let buffer = 0;
  let bits = 0;
  normalizeText_(secret).toUpperCase().replace(/[^A-Z2-7]/g, "").split("").forEach((character) => {
    const value = alphabet.indexOf(character);
    if (value < 0) throw new Error("La clave del autenticador no es válida.");
    buffer = (buffer << 5) | value;
    bits += 5;
    if (bits >= 8) {
      output.push((buffer >>> (bits - 8)) & 255);
      bits -= 8;
    }
  });
  return output;
}

function verifyTotp_(secret, inputCode, lastAcceptedStep) {
  if (!/^\d{6}$/.test(inputCode)) return false;
  const nowStep = Math.floor(Date.now() / 30000);
  for (let offset = -1; offset <= 1; offset += 1) {
    const step = nowStep + offset;
    if (step <= lastAcceptedStep) continue;
    if (totpAt_(secret, step) === inputCode) return true;
  }
  return false;
}

function totpAt_(secret, step) {
  let counter = step;
  const message = new Array(8).fill(0);
  for (let index = 7; index >= 0; index -= 1) {
    message[index] = counter & 255;
    counter = Math.floor(counter / 256);
  }
  const digest = Utilities.computeHmacSha1Signature(message, base32Decode_(secret));
  const offset = digest[digest.length - 1] & 15;
  const binary = ((digest[offset] & 127) << 24)
    | ((digest[offset + 1] & 255) << 16)
    | ((digest[offset + 2] & 255) << 8)
    | (digest[offset + 3] & 255);
  return String(binary % 1000000).padStart(6, "0");
}

function validateAttachment_(attachment) {
  if (!attachment || typeof attachment.getBytes !== "function") {
    throw new Error("Adjunta un antecedente en PDF, JPG o PNG.");
  }
  const name = sanitizeFileName_(attachment.getName());
  const contentType = String(attachment.getContentType() || "").toLowerCase();
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  const extensionAllowed = /\.(pdf|jpe?g|png)$/i.test(name);
  if (!extensionAllowed || (contentType && !allowedTypes.includes(contentType))) {
    throw new Error("El archivo debe ser PDF, JPG o PNG.");
  }
  if (attachment.getBytes().length > CONFIG.maxAttachmentBytes) {
    throw new Error("El archivo supera el límite de 5 MB.");
  }
}

function requireAdmin_(token) {
  const value = String(token || "");
  if (value.length < 32 || value.length > 100) throw new Error("Sesión administrativa no válida. Inicia sesión nuevamente.");
  const cache = CacheService.getScriptCache();
  const key = CONFIG.adminSessionPrefix + hashText_(value);
  const user = cache.get(key);
  if (!user) throw new Error("Sesión administrativa expirada. Inicia sesión nuevamente.");
  cache.put(key, user, CONFIG.adminSessionSeconds);
  return user;
}

function hashPassword_(password, salt) {
  let digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + ":" + password, Utilities.Charset.UTF_8);
  for (let i = 1; i < CONFIG.passwordHashIterations; i += 1) {
    digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, digest);
  }
  return digest.map((byte) => (byte & 255).toString(16).padStart(2, "0")).join("");
}

function constantTimeEquals_(a, b) {
  const left = String(a);
  const right = String(b);
  let diff = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    diff |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function ensureSheet_(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
}

function getSheet_(name) {
  const id = getRequiredProperty_("ACHETSU_SPREADSHEET_ID");
  const sheet = SpreadsheetApp.openById(id).getSheetByName(name);
  if (!sheet) throw new Error("No existe la hoja " + name + ". Ejecuta initializeBackend().");
  return sheet;
}

function getRequiredProperty_(name) {
  const value = PropertiesService.getScriptProperties().getProperty(name);
  if (!value) throw new Error("El backend no está inicializado. Ejecuta initializeBackend() como administrador.");
  return value;
}

function findMember_(memberId, category) {
  const match = findMemberRow_(memberId, category);
  return match ? match.member : null;
}

function findMemberRow_(memberId, category) {
  const values = getSheet_(CONFIG.memberSheet).getDataRange().getValues();
  for (let index = 1; index < values.length; index += 1) {
    if (String(values[index][0]) === memberId && String(values[index][1]) === category) {
      return { row: index + 1, member: memberFromRow_(values[index]) };
    }
  }
  return null;
}

function memberFromRow_(row) {
  return {
    id: unescapeSheetText_(row[0]),
    category: unescapeSheetText_(row[1]),
    surname: unescapeSheetText_(row[2]),
    givenName: unescapeSheetText_(row[3]),
    email: unescapeSheetText_(row[4]),
    university: unescapeSheetText_(row[5]),
    eligible2026: row[6] === true
  };
}

function safeSheetText_(value) {
  const text = String(value == null ? "" : value);
  return text.charAt(0) === "=" ? "'" + text : text;
}

function unescapeSheetText_(value) {
  const text = String(value == null ? "" : value);
  return text.slice(0, 2) === "'=" ? text.slice(1) : text;
}

function publicMember_(member) {
  return {
    id: member.id,
    category: member.category,
    surname: member.surname,
    givenName: member.givenName,
    email: member.email,
    university: member.university,
    eligible2026: member.eligible2026
  };
}

function cleanText_(value, maxLength) {
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function normalizeText_(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone_(value) {
  return /^[+()\d\s.-]{8,40}$/.test(value);
}

function sanitizeFileName_(value) {
  return cleanText_(value, 120).replace(/[\\/:*?"<>|]/g, "_") || "antecedente";
}
