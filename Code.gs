const SPREADSHEET_ID = '1qVxGpBVacPG1R7hPEbKCjVKZKKMg2UlVYBusJ2twHlk';

const QUESTION_HEADERS = [
  'RAE 1. Ajuste del plan y seguimiento [Analiza la coherencia del plan con el mandato institucional, las necesidades observadas y los objetivos de intervención.]',
  'RAE 1. Ajuste del plan y seguimiento [Fundamenta los ajustes del plan desde perspectivas teóricas, metodológicas y éticas.]',
  'RAE 1. Ajuste del plan y seguimiento [Propone indicadores, medios de verificación y protocolos de seguimiento pertinentes y factibles.]',
  'RAE 1. Ajuste del plan y seguimiento [Utiliza registros de seguimiento para reconocer avances y proponer ajustes.]',
  'RAE 2. Implementación [Ejecuta actividades coherentes con la propuesta de intervención ajustada.]',
  'RAE 2. Implementación [Registra actividades, recursos, coordinaciones y ajustes con evidencia de terreno.]',
  'RAE 2. Implementación [Desarrolla el trabajo con sujetos y comunidades de manera respetuosa y acorde al contexto.]',
  'RAE 2. Implementación [Identifica nudos críticos y elementos innovadores, y propone respuestas fundamentadas.]',
  'RAE 3. Evaluación y sistematización [Diseña una evaluación pertinente al contexto institucional, fenómeno y objetivos.]',
  'RAE 3. Evaluación y sistematización [Selecciona y aplica herramientas evaluativas con criterios metodológicos adecuados.]',
  'RAE 3. Evaluación y sistematización [Sistematiza resultados e identifica brechas y limitaciones de la intervención.]',
  'RAE 3. Evaluación y sistematización [Propone mejoras futuras basadas en evidencia, teoría, factibilidad y ética.]',
  'RAE 4. Reflexión ética [Reconoce dilemas éticos concretos relacionados con consentimiento, confidencialidad, información o trato digno.]',
  'RAE 4. Reflexión ética [Fundamenta sus decisiones en principios profesionales, normativa y marcos éticos pertinentes.]',
  'RAE 4. Reflexión ética [Resguarda información sensible y aplica criterios de anonimización.]',
  'RAE 4. Reflexión ética [Reflexiona sobre las consecuencias de sus decisiones en el contexto institucional y social.]',
  'Competencias transversales [Cumple acuerdos, horarios y responsabilidades de manera consistente.]',
  'Competencias transversales [Demuestra autonomía e iniciativa, y utiliza la retroalimentación para mejorar.]',
  'Competencias transversales [Colabora con el equipo respetando roles, funciones y acuerdos de trabajo.]',
  'Competencias transversales [Se comunica profesionalmente y comprende el contexto territorial e institucional.]'
];

const BASE_RESPONSE_HEADERS = [
  'Dirección de correo electrónico',
  'Nombre supervisor(a) Institución',
  'Nombre estudiante supervisado(a)',
  'Detalle las principales fortalezas que ubique en el desempeño profesional de él/la estudiante',
  'Detalle aspectos a mejorar de cara al próximo semestre',
  'Nombre completo',
  'Institución'
];

const STUDENT_SUPERVISORS = {
  'Cofré Morales, Esteban Patricio': 'Esteban Cofré Morales',
  'Perez Barria, Tatiana Valeska': 'Esteban Cofré Morales',
  'Ayancán Barría, Natalia Paz': 'Esteban Cofré Morales',
  'Calisto Silva, Luz María Belén': 'Esteban Cofré Morales',
  'Cumian Jaramillo, Felipe Bastián': 'Esteban Cofré Morales',
  'Diaz Veliz, Yenifer Madorna': 'Esteban Cofré Morales',
  'Mac-Kay Saavedra, Francisca Javiera': 'Esteban Cofré Morales',
  'Poblete Poblete, Cesar Antonio': 'Esteban Cofré Morales',
  'Rios Alzate, Laura': 'Esteban Cofré Morales',
  'Torres Rogel, Tiare Soledad': 'Esteban Cofré Morales',
  'Vidal De la Cruz, Fernanda Valentina': 'Esteban Cofré Morales',
  'Contreras Cerro, Nicolás Gonzalo': 'María Fernanda Leiva',
  'Esparza Jara, Antonella': 'María Fernanda Leiva',
  'Guevara Rodríguez, Isidora Francisca': 'María Fernanda Leiva',
  'Hernandez Arteaga, Constanza Beatriz': 'María Fernanda Leiva',
  'Igor Bartsch, Cristina Andrea': 'María Fernanda Leiva',
  'Legue Legue, Catalina Andrea': 'María Fernanda Leiva',
  'Troncoso Barra, Thaiz Soledad': 'María Fernanda Leiva',
  'Vargas Torres, Dafnne Yineck': 'María Fernanda Leiva',
  'Yévenes Azócar, Catalina Alejandra': 'María Fernanda Leiva'
};

const ROLE_CONFIG = {
  supervision_terreno: { label: 'Supervisión en terreno', weight: 40 },
  supervision_docente: { label: 'Supervisión docente', weight: 40 },
  autoevaluacion: { label: 'Autoevaluación', weight: 20 }
};

const EXTRA_HEADERS = [
  'Periodo de evaluación',
  'Semestre evaluado',
  'Rol evaluador',
  'Peso tripartito (%)',
  'Supervisor(a) docente',
  ...QUESTION_HEADERS,
  'Criterios evaluados',
  'Puntaje máximo ajustado',
  'Porcentaje de logro (%)',
  'Acuerdos de supervisión para el próximo periodo',
  'Recomendaciones para futuro profesional',
  'Idea de tesis 2027 relacionada con el fenómeno institucional',
  'Aporte ponderado',
  'Nota integrada tripartita',
  'Estado de integración tripartita'
];

function doPost(event) {
  try {
    const parameters = event && event.parameter ? event.parameter : {};
    const roleKey = parameters.rol;
    const role = ROLE_CONFIG[roleKey];
    if (!role) throw new Error('Seleccione un rol válido para la evaluación.');
    const evaluationPeriod = requiredText(parameters.periodo, 'instancia de evaluación');
    const semester = requiredText(parameters.semestre, 'semestre evaluado');
    if (!['Seguimiento intermedio', 'Cierre semestral', 'Evaluación general'].includes(evaluationPeriod)) {
      throw new Error('Seleccione una instancia de evaluación semestral válida.');
    }
    if (!['Primer semestre', 'Segundo semestre'].includes(semester)) {
      throw new Error('La evaluación debe corresponder al primer o segundo semestre.');
    }
    const recipientEmail = requiredText(parameters.correo, 'correo electrónico');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      throw new Error('Ingrese un correo electrónico válido para recibir la copia.');
    }

    const ratings = QUESTION_HEADERS.map((header, index) => {
      const rawValue = parameters['q' + (index + 1)];
      if (rawValue === 'NO_OBSERVADO') return null;
      const value = Number(rawValue);
      if (!Number.isInteger(value) || value < 1 || value > 4) {
        throw new Error('Cada criterio debe tener una calificación entre 1 y 4 o marcarse como No observado.');
      }
      return value;
    });
    const evaluatedCount = ratings.filter(value => value !== null).length;
    const score = ratings.reduce((sum, value) => sum + (value === null ? 0 : value), 0);
    const maximumScore = evaluatedCount * 4;
    const achievement = evaluatedCount ? score / maximumScore : 0;
    const componentGrade = evaluatedCount >= 16
      ? Math.max(1, Math.min(7, Math.round((4 + (achievement - 0.7) * 10) * 10) / 10))
      : '';

    const student = requiredText(parameters.estudiante, 'estudiante');
    const teacher = requiredText(parameters.supervisor_docente, 'supervisor(a) docente');
    if (STUDENT_SUPERVISORS[student] !== teacher) {
      throw new Error('El/la estudiante seleccionado(a) no corresponde al/a la supervisor(a) docente indicado(a).');
    }
    const terrainSupervisor = roleKey === 'supervision_terreno'
      ? requiredText(parameters.supervisor, 'supervisor(a) en terreno')
      : '';
    const evaluatorName = roleKey === 'supervision_terreno'
      ? terrainSupervisor
      : roleKey === 'supervision_docente' ? teacher : student;
    const isGeneral = evaluationPeriod === 'Evaluación general';

    const values = {
      'Marca temporal': new Date(),
      'Periodo de evaluación': evaluationPeriod,
      'Semestre evaluado': semester,
      'Rol evaluador': role.label,
      'Peso tripartito (%)': role.weight,
      'Dirección de correo electrónico': recipientEmail,
      'Nombre supervisor(a) Institución': terrainSupervisor,
      'Nombre estudiante supervisado(a)': student,
      'Supervisor(a) docente': teacher,
      'Detalle las principales fortalezas que ubique en el desempeño profesional de él/la estudiante': requiredText(parameters.fortalezas, 'fortalezas'),
      'Detalle aspectos a mejorar de cara al próximo semestre': requiredText(parameters.aspectos_mejorar, 'aspectos a mejorar'),
      'Nombre completo': evaluatorName,
      'Institución': requiredText(parameters.institucion, 'institución'),
      'Puntaje': score,
      'Nota': componentGrade,
      'Criterios evaluados': evaluatedCount,
      'Puntaje máximo ajustado': maximumScore,
      'Porcentaje de logro (%)': Math.round(achievement * 1000) / 10,
      'Acuerdos de supervisión para el próximo periodo': requiredText(parameters.acuerdos, 'acuerdos para el próximo periodo'),
      'Recomendaciones para futuro profesional': isGeneral ? requiredText(parameters.proyeccion_profesional, 'recomendaciones para futuro profesional') : '',
      'Idea de tesis 2027 relacionada con el fenómeno institucional': isGeneral ? requiredText(parameters.idea_tesis, 'idea de tesis 2027') : '',
      'Aporte ponderado': componentGrade === '' ? '' : Math.round(componentGrade * role.weight) / 100,
      'Nota integrada tripartita': '',
      'Estado de integración tripartita': 'Pendiente de otras perspectivas'
    };
    QUESTION_HEADERS.forEach((header, index) => {
      values[header] = ratings[index] === null ? 'No observado' : ratings[index];
    });

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = findResponseSheet(spreadsheet);
    if (!sheet) throw new Error('No se encontró una pestaña con los encabezados de la hoja original.');

    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    let integration;
    try {
      const headers = ensureHeaders(sheet);
      const row = headers.map(header => {
        const valueHeader = Object.keys(values).find(expected => normalizeHeader(expected) === normalizeHeader(header));
        return valueHeader ? values[valueHeader] : '';
      });
      const rowIndex = sheet.getLastRow() + 1;
      sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
      integration = updateTripartiteIntegration(sheet, headers, rowIndex, {
        student,
        period: values['Periodo de evaluación'],
        semester: values['Semestre evaluado']
      });
    } finally {
      lock.releaseLock();
    }

    values['Nota integrada tripartita'] = integration.complete ? integration.grade : '';
    values['Estado de integración tripartita'] = integration.complete
      ? 'Completa'
      : 'Pendiente: ' + integration.missing.join(', ');

    let copyMessage;
    try {
      sendEvaluationCopy(values, ratings, componentGrade, integration);
      copyMessage = 'Se envió una copia PDF a ' + recipientEmail + '.';
    } catch (mailError) {
      Logger.log('No se pudo enviar copia a ' + recipientEmail + ': ' + mailError.message);
      copyMessage = 'La evaluación quedó guardada, pero no se pudo enviar el correo. ' + (mailError.message || '');
    }

    const gradeMessage = componentGrade === ''
      ? 'Nota del instrumento pendiente: se requieren al menos 16 criterios observados.'
      : 'Nota del instrumento: ' + componentGrade.toFixed(1) + '.';
    const integrationMessage = integration.complete
      ? 'Nota tripartita integrada: ' + integration.grade.toFixed(1) + '.'
      : 'Integración tripartita pendiente: ' + integration.missing.join(', ') + '.';
    return renderResult('Evaluación registrada: ' + role.label + ' (' + role.weight + '%). Puntaje ' + score + ' de ' + maximumScore + ' (' + Math.round(achievement * 100) + '%). ' + gradeMessage + ' ' + integrationMessage + ' ' + copyMessage, true);
  } catch (error) {
    return renderResult(error.message || 'No fue posible guardar la evaluación.', false);
  }
}

function sendEvaluationCopy(values, ratings, componentGrade, integration) {
  if (MailApp.getRemainingDailyQuota() < 1) {
    throw new Error('Se agotó la cuota diaria de correo del formulario.');
  }

  const evaluationKey = [
    values['Dirección de correo electrónico'].toLowerCase(),
    values['Nombre estudiante supervisado(a)'],
    values['Periodo de evaluación'],
    values['Semestre evaluado'],
    values['Rol evaluador']
  ].join('|');
  const cache = CacheService.getScriptCache();
  const cacheKey = 'evaluation-copy:' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, evaluationKey)
  );
  if (cache.get(cacheKey)) {
    throw new Error('Ya se envió una copia de esta evaluación recientemente.');
  }
  cache.put(cacheKey, 'sending', 300);

  try {
    const reportHtml = buildEvaluationReportHtml(values, ratings, componentGrade, integration);
    const pdf = HtmlService.createHtmlOutput(reportHtml)
      .getBlob()
      .getAs(MimeType.PDF)
      .setName('Evaluacion-' + safeFileName(values['Nombre estudiante supervisado(a)']) + '.pdf');
    const plainText = [
      'Copia de la evaluación tripartita de práctica.',
      'Estudiante: ' + values['Nombre estudiante supervisado(a)'],
      'Instancia: ' + values['Periodo de evaluación'],
      'Semestre: ' + values['Semestre evaluado'],
      'Rol: ' + values['Rol evaluador'],
      'Puntaje: ' + values['Puntaje'] + ' de ' + values['Puntaje máximo ajustado'],
      'Nota: ' + (componentGrade === '' ? 'Pendiente' : componentGrade.toFixed(1)),
      'El PDF adjunto contiene la evaluación completa.'
    ].join('\n');

    MailApp.sendEmail({
      to: values['Dirección de correo electrónico'],
      subject: 'Copia de evaluación de práctica · ' + values['Nombre estudiante supervisado(a)'],
      body: plainText,
      htmlBody: reportHtml,
      attachments: [pdf],
      name: 'Evaluación de Prácticas Profesionales'
    });
  } catch (error) {
    cache.remove(cacheKey);
    throw error;
  }
}

function buildEvaluationReportHtml(values, ratings, componentGrade, integration) {
  const detailRows = QUESTION_HEADERS.map((question, index) =>
    '<tr><th>' + escapeHtml(question) + '</th><td>' + escapeHtml(ratings[index] === null ? 'No observado' : String(ratings[index])) + '</td></tr>'
  ).join('');
  const summaryRows = [
    ['Fecha y hora', String(values['Marca temporal'])],
    ['Evaluador(a)', values['Nombre completo']],
    ['Estudiante', values['Nombre estudiante supervisado(a)']],
    ['Rol evaluador', values['Rol evaluador']],
    ['Instancia', values['Periodo de evaluación']],
    ['Semestre', values['Semestre evaluado']],
    ['Correo declarado', values['Dirección de correo electrónico']],
    ['Supervisor(a) docente', values['Supervisor(a) docente']],
    ['Supervisor(a) en terreno', values['Nombre supervisor(a) Institución']],
    ['Centro de práctica', values['Institución']],
    ['Fortalezas', values['Detalle las principales fortalezas que ubique en el desempeño profesional de él/la estudiante']],
    ['Aspectos por fortalecer', values['Detalle aspectos a mejorar de cara al próximo semestre']],
    ['Acuerdos', values['Acuerdos de supervisión para el próximo periodo']],
    ['Recomendaciones para futuro profesional', values['Recomendaciones para futuro profesional']],
    ['Idea de tesis 2027', values['Idea de tesis 2027 relacionada con el fenómeno institucional']]
  ].filter(entry => entry[1]);
  const summaryHtml = summaryRows.map(entry =>
    '<tr><th>' + escapeHtml(entry[0]) + '</th><td>' + escapeHtml(String(entry[1])) + '</td></tr>'
  ).join('');
  const integrationText = integration.complete
    ? integration.grade.toFixed(1)
    : 'Pendiente: ' + integration.missing.join(', ');

  return '<!doctype html><html lang="es"><meta charset="utf-8"><style>' +
    'body{font:12px Arial,sans-serif;color:#1d2b29;margin:28px}h1{font-size:20px}h2{font-size:15px;margin-top:24px}' +
    'table{width:100%;border-collapse:collapse}th,td{padding:7px;border:1px solid #cbd7d1;text-align:left;vertical-align:top}' +
    'th{width:34%;background:#edf3ef}tr{page-break-inside:avoid}' +
    '</style><body><h1>Evaluación del proceso de práctica</h1><table>' + summaryHtml + '</table>' +
    '<h2>Rúbrica de 20 criterios</h2><table>' + detailRows + '</table>' +
    '<h2>Resultados</h2><table><tr><th>Puntaje</th><td>' + values['Puntaje'] + ' de ' + values['Puntaje máximo ajustado'] + ' (' + values['Porcentaje de logro (%)'] + '%)</td></tr>' +
    '<tr><th>Nota del instrumento</th><td>' + (componentGrade === '' ? 'Pendiente' : componentGrade.toFixed(1)) + '</td></tr>' +
    '<tr><th>Nota tripartita</th><td>' + escapeHtml(integrationText) + '</td></tr></table></body></html>';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function safeFileName(value) {
  return String(value).replace(/[^a-z0-9-]+/gi, '-').replace(/^-|-$/g, '');
}

function autorizarMailApp() {
  const sheetName = SpreadsheetApp.openById(SPREADSHEET_ID).getName();
  const cuota = MailApp.getRemainingDailyQuota();
  Logger.log('Hoja autorizada: ' + sheetName + '. Destinatarios disponibles hoy: ' + cuota);
  return cuota;
}

function findResponseSheet(spreadsheet) {
  return spreadsheet.getSheets().find(sheet => {
    const lastColumn = sheet.getLastColumn();
    if (lastColumn === 0) return false;
    const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0].map(normalizeHeader);
    return BASE_RESPONSE_HEADERS.every(expected => headers.includes(normalizeHeader(expected))) &&
      headers.includes(normalizeHeader('Puntaje')) && headers.includes(normalizeHeader('Nota'));
  }) || null;
}

function ensureHeaders(sheet) {
  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
  const normalizedHeaders = headers.map(normalizeHeader);
  const missingHeaders = ['Marca temporal', ...EXTRA_HEADERS].filter(expected =>
    !normalizedHeaders.includes(normalizeHeader(expected))
  );
  if (missingHeaders.length) {
    sheet.getRange(1, lastColumn + 1, 1, missingHeaders.length).setValues([missingHeaders]);
    headers.push(...missingHeaders);
  }
  return headers;
}

function updateTripartiteIntegration(sheet, headers, currentRow, evaluation) {
  const column = {};
  headers.forEach((header, index) => {
    column[normalizeHeader(header)] = index + 1;
  });
  const roleColumn = column[normalizeHeader('Rol evaluador')];
  const studentColumn = column[normalizeHeader('Nombre estudiante supervisado(a)')];
  const periodColumn = column[normalizeHeader('Periodo de evaluación')];
  const semesterColumn = column[normalizeHeader('Semestre evaluado')];
  const gradeColumn = column[normalizeHeader('Nota')];
  const integratedColumn = column[normalizeHeader('Nota integrada tripartita')];
  const statusColumn = column[normalizeHeader('Estado de integración tripartita')];
  const lastRow = sheet.getLastRow();
  const rows = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  const latestByRole = {};

  rows.forEach((row, index) => {
    const sameEvaluation = normalizeHeader(row[studentColumn - 1]) === normalizeHeader(evaluation.student) &&
      normalizeHeader(row[periodColumn - 1]) === normalizeHeader(evaluation.period) &&
      normalizeHeader(row[semesterColumn - 1]) === normalizeHeader(evaluation.semester);
    if (!sameEvaluation) return;
    const roleLabel = normalizeHeader(row[roleColumn - 1]);
    const roleKey = Object.keys(ROLE_CONFIG).find(key => ROLE_CONFIG[key].label === roleLabel);
    if (roleKey) latestByRole[roleKey] = { row: index + 2, grade: row[gradeColumn - 1] };
  });

  const requiredRoles = Object.keys(ROLE_CONFIG);
  const missing = requiredRoles.filter(roleKey => !latestByRole[roleKey] ||
    typeof latestByRole[roleKey].grade !== 'number' || !Number.isFinite(latestByRole[roleKey].grade));
  if (missing.length) {
    const missingLabels = missing.map(roleKey => ROLE_CONFIG[roleKey].label);
    sheet.getRange(currentRow, statusColumn).setValue('Pendiente: ' + missingLabels.join(', '));
    return { complete: false, missing: missingLabels };
  }

  const integratedGrade = Math.round(requiredRoles.reduce((sum, roleKey) =>
    sum + latestByRole[roleKey].grade * ROLE_CONFIG[roleKey].weight / 100, 0) * 10) / 10;
  requiredRoles.forEach(roleKey => {
    sheet.getRange(latestByRole[roleKey].row, integratedColumn).setValue(integratedGrade);
    sheet.getRange(latestByRole[roleKey].row, statusColumn).setValue('Completa');
  });
  return { complete: true, grade: integratedGrade, missing: [] };
}

function normalizeHeader(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

function requiredText(value, label) {
  const text = String(value || '').trim();
  if (!text) throw new Error('Complete el campo ' + label + '.');
  return text;
}

function renderResult(message, success) {
  const color = success ? '#28664a' : '#9b352d';
  const escapedMessage = String(message).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
  return HtmlService.createHtmlOutput(
    '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Resultado de evaluación</title><body style="margin:0;padding:32px;background:#f5f7f4;font:16px Segoe UI,sans-serif;color:#1d2b29">' +
    '<main style="max-width:640px;margin:10vh auto;padding:28px;background:#fff;border-top:5px solid ' + color + '">' +
    '<h1 style="font-size:24px">' + (success ? 'Evaluación recibida' : 'No se pudo enviar') + '</h1>' +
    '<p>' + escapedMessage + '</p></main></body></html>'
  );
}
