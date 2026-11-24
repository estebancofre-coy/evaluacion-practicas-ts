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

// Constantes para Evaluación de Centro de Práctica (Formulario confidencial de estudiantes)
const CP_CRITERIA = [
  'Cuenta con un espacio de trabajo para el estudiante en práctica apropiado para realizar el proceso.',
  'Cuenta con instalaciones que facilitan el proceso de práctica.',
  'Mantiene buen clima laboral.',
  'Permite al estudiante en práctica trabajar de manera autónoma, realizando tareas/actividades acorde al trabajo social.',
  'Es un espacio donde se considera la participación y opinión del estudiante en práctica.'
];

const ST_CRITERIA = [
  'Existe buena comunicación con el ST.',
  'Existe un acompañamiento constante por parte del ST.',
  'El ST cuenta con tiempo y buena disposición para favorecer el proceso de aprendizaje.',
  'Mantiene un trato profesional, considerando roles y funciones con el estudiante en práctica.',
  'Mantiene un resguardo de una actitud ética en coherencia con el Código de Ética Profesional en su actuar profesional.',
  'Demuestra respeto por la autodeterminación de las y los sujetos.',
  'Se comunica adecuada, respetuosa y asertivamente, con una actitud receptiva.',
  'Existe una real opción de proponer una intervención social.',
  'Considera la opinión del/de la estudiante en las decisiones y desarrollo del proceso de práctica.'
];

const CENTRO_PRACTICA_SHEET_NAME = 'Evaluación Centro de Práctica';

const CENTRO_PRACTICA_HEADERS = [
  'Marca temporal',
  'Dirección de correo electrónico',
  'Nombre estudiante',
  'Supervisor(a) docente',
  'Nombre Institución',
  'Programa',
  'Supervisor(a) en terreno',
  'Semestre evaluado',
  'Año',
  'CP 1. Espacio de trabajo (0-5)',
  'CP 1. Comentarios',
  'CP 2. Instalaciones (0-5)',
  'CP 2. Comentarios',
  'CP 3. Clima laboral (0-5)',
  'CP 3. Comentarios',
  'CP 4. Trabajo autónomo (0-5)',
  'CP 4. Comentarios',
  'CP 5. Participación y opinión (0-5)',
  'CP 5. Comentarios',
  'ST 1. Comunicación (0-5)',
  'ST 1. Comentarios',
  'ST 2. Acompañamiento constante (0-5)',
  'ST 2. Comentarios',
  'ST 3. Tiempo y disposición (0-5)',
  'ST 3. Comentarios',
  'ST 4. Trato profesional y roles (0-5)',
  'ST 4. Comentarios',
  'ST 5. Actitud ética y código (0-5)',
  'ST 5. Comentarios',
  'ST 6. Respeto por autodeterminación (0-5)',
  'ST 6. Comentarios',
  'ST 7. Comunicación asertiva (0-5)',
  'ST 7. Comentarios',
  'ST 8. Opción de intervención (0-5)',
  'ST 8. Comentarios',
  'ST 9. Considera la opinión (0-5)',
  'ST 9. Comentarios',
  'Observaciones y comentarios generales',
  'Puntaje Centro de Práctica (máx 25)',
  'Puntaje Supervisor(a) en Terreno (máx 45)',
  'Puntaje Total (máx 70)',
  'Porcentaje de logro (%)',
  'Nota calculada (Escala 70%)'
];

function doGet(event) {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html lang="es"><meta charset="utf-8">' +
    '<body style="font:16px Arial,sans-serif;padding:32px;background:#f4f6f2;color:#20312a">' +
    '<h2>Portal de Evaluación de Prácticas Profesionales</h2>' +
    '<p>El backend de Google Apps Script está activo y procesando evaluaciones.</p>' +
    '<p><a href="https://estebancofre-coy.github.io/evaluacion-practicas-ts/" style="color:#28664a;font-weight:bold">Ir al portal de evaluación</a></p>' +
    '</body></html>'
  );
}

function doPost(event) {
  try {
    const parameters = event && event.parameter ? event.parameter : {};
    const roleKey = parameters.rol;

    // Manejar formulario paralelo de evaluación del centro de práctica (exclusivo para estudiantes)
    if (roleKey === 'centro_practica') {
      return handleCentroPractica(parameters);
    }

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

// Procesamiento de la evaluación del centro de práctica
function handleCentroPractica(parameters) {
  const student = requiredText(parameters.estudiante, 'estudiante');
  const teacher = requiredText(parameters.supervisor_docente || STUDENT_SUPERVISORS[student], 'supervisor(a) docente');
  if (STUDENT_SUPERVISORS[student] && STUDENT_SUPERVISORS[student] !== teacher) {
    throw new Error('El/la estudiante seleccionado(a) no corresponde al/a la supervisor(a) docente indicado(a).');
  }
  const institution = requiredText(parameters.institucion, 'nombre de la institución / centro de práctica');
  const program = String(parameters.programa || '').trim();
  const terrainSupervisor = requiredText(parameters.supervisor_terreno, 'supervisor(a) en terreno');
  const semester = requiredText(parameters.semestre, 'semestre evaluado');
  if (!['Primer semestre', 'Segundo semestre'].includes(semester)) {
    throw new Error('El semestre evaluado debe ser Primer semestre o Segundo semestre.');
  }
  const year = requiredText(parameters.anio, 'año');
  const recipientEmail = requiredText(parameters.correo, 'correo electrónico');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
    throw new Error('Ingrese un correo electrónico válido para recibir la copia.');
  }

  // Parsear los 5 criterios de Centro de Práctica (0 a 5)
  const cpRatings = [];
  const cpComments = [];
  for (let i = 1; i <= 5; i++) {
    const rawVal = parameters['cp' + i];
    const val = Number(rawVal);
    if (!Number.isInteger(val) || val < 0 || val > 5) {
      throw new Error('Cada criterio de Centro de Práctica debe tener una calificación entre 0 y 5.');
    }
    cpRatings.push(val);
    cpComments.push(String(parameters['cp_comentario_' + i] || '').trim());
  }

  // Parsear los 9 criterios de Supervisor en Terreno (0 a 5)
  const stRatings = [];
  const stComments = [];
  for (let i = 1; i <= 9; i++) {
    const rawVal = parameters['st' + i];
    const val = Number(rawVal);
    if (!Number.isInteger(val) || val < 0 || val > 5) {
      throw new Error('Cada criterio de Supervisor en Terreno debe tener una calificación entre 0 y 5.');
    }
    stRatings.push(val);
    stComments.push(String(parameters['st_comentario_' + i] || '').trim());
  }

  const observaciones = String(parameters.observaciones || '').trim();

  const scoreCP = cpRatings.reduce((sum, v) => sum + v, 0);
  const scoreST = stRatings.reduce((sum, v) => sum + v, 0);
  const totalScore = scoreCP + scoreST;
  const maxScore = 70; // 14 criterios * 5
  const achievement = Math.round((totalScore / maxScore) * 1000) / 10;

  // Escala de notas chilena 1.0 a 7.0 al 70% de exigencia (49 pts = nota 4.0)
  let grade;
  if (totalScore >= 49) {
    grade = 4.0 + 3.0 * (totalScore - 49) / (70 - 49);
  } else {
    grade = 1.0 + 3.0 * totalScore / 49;
  }
  grade = Math.max(1.0, Math.min(7.0, Math.round(grade * 10) / 10));

  const values = {
    'Marca temporal': new Date(),
    'Dirección de correo electrónico': recipientEmail,
    'Nombre estudiante': student,
    'Supervisor(a) docente': teacher,
    'Nombre Institución': institution,
    'Programa': program,
    'Supervisor(a) en terreno': terrainSupervisor,
    'Semestre evaluado': semester,
    'Año': year,
    'Observaciones y comentarios generales': observaciones,
    'Puntaje Centro de Práctica (máx 25)': scoreCP,
    'Puntaje Supervisor(a) en Terreno (máx 45)': scoreST,
    'Puntaje Total (máx 70)': totalScore,
    'Porcentaje de logro (%)': achievement,
    'Nota calculada (Escala 70%)': grade
  };

  const cpLabels = ['Espacio de trabajo', 'Instalaciones', 'Clima laboral', 'Trabajo autónomo', 'Participación y opinión'];
  for (let i = 0; i < 5; i++) {
    values['CP ' + (i + 1) + '. ' + cpLabels[i] + ' (0-5)'] = cpRatings[i];
    values['CP ' + (i + 1) + '. Comentarios'] = cpComments[i];
  }

  const stLabels = [
    'Comunicación',
    'Acompañamiento constante',
    'Tiempo y disposición',
    'Trato profesional y roles',
    'Actitud ética y código',
    'Respeto por autodeterminación',
    'Comunicación asertiva',
    'Opción de intervención',
    'Considera la opinión'
  ];
  for (let i = 0; i < 9; i++) {
    values['ST ' + (i + 1) + '. ' + stLabels[i] + ' (0-5)'] = stRatings[i];
    values['ST ' + (i + 1) + '. Comentarios'] = stComments[i];
  }

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateCentroPracticaSheet(spreadsheet);

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const headers = ensureSheetHeaders(sheet, CENTRO_PRACTICA_HEADERS);
    const row = headers.map(header => {
      const matchKey = Object.keys(values).find(expected => normalizeHeader(expected) === normalizeHeader(header));
      return matchKey ? values[matchKey] : '';
    });
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  let copyMessage;
  try {
    sendCentroPracticaCopy(values, cpRatings, cpComments, stRatings, stComments, scoreCP, scoreST, totalScore, maxScore, achievement, grade);
    copyMessage = 'Se envió una copia PDF a ' + recipientEmail + '.';
  } catch (mailError) {
    Logger.log('No se pudo enviar copia a ' + recipientEmail + ': ' + mailError.message);
    copyMessage = 'La evaluación del centro quedó guardada en el sistema, pero no se pudo enviar el correo de confirmación: ' + (mailError.message || '');
  }

  return renderResult('Evaluación del Centro de Práctica registrada exitosamente. Puntaje obtenido: ' + totalScore + ' de ' + maxScore + ' (' + achievement + '% de logro). Nota: ' + grade.toFixed(1) + '. ' + copyMessage, true);
}

function sendCentroPracticaCopy(values, cpRatings, cpComments, stRatings, stComments, scoreCP, scoreST, totalScore, maxScore, achievement, grade) {
  if (MailApp.getRemainingDailyQuota() < 1) {
    throw new Error('Se agotó la cuota diaria de correo del formulario.');
  }

  const evaluationKey = [
    values['Dirección de correo electrónico'].toLowerCase(),
    values['Nombre estudiante'],
    values['Semestre evaluado'],
    values['Año'],
    'centro_practica'
  ].join('|');
  const cache = CacheService.getScriptCache();
  const cacheKey = 'centro-practica-copy:' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, evaluationKey)
  );
  if (cache.get(cacheKey)) {
    throw new Error('Ya se envió una copia de esta evaluación recientemente.');
  }
  cache.put(cacheKey, 'sending', 300);

  try {
    const reportHtml = buildCentroPracticaReportHtml(values, cpRatings, cpComments, stRatings, stComments, scoreCP, scoreST, totalScore, maxScore, achievement, grade);
    const pdf = HtmlService.createHtmlOutput(reportHtml)
      .getBlob()
      .getAs(MimeType.PDF)
      .setName('Evaluacion-Centro-Practica-' + safeFileName(values['Nombre estudiante']) + '.pdf');
    const plainText = [
      'Copia de evaluación del Centro de Práctica y Supervisión en Terreno.',
      'Estudiante: ' + values['Nombre estudiante'],
      'Institución: ' + values['Nombre Institución'],
      'Programa: ' + (values['Programa'] || 'No especificado'),
      'Supervisor(a) en terreno: ' + values['Supervisor(a) en terreno'],
      'Supervisor(a) docente: ' + values['Supervisor(a) docente'],
      'Semestre/Año: ' + values['Semestre evaluado'] + ' ' + values['Año'],
      'Puntaje CP: ' + scoreCP + ' de 25',
      'Puntaje ST: ' + scoreST + ' de 45',
      'Puntaje Total: ' + totalScore + ' de ' + maxScore + ' (' + achievement + '%)',
      'Nota calculada (70% exigencia): ' + grade.toFixed(1),
      'El PDF adjunto contiene la evaluación completa y los comentarios registrados.'
    ].join('\n');

    MailApp.sendEmail({
      to: values['Dirección de correo electrónico'],
      subject: 'Copia de evaluación de Centro de Práctica · ' + values['Nombre estudiante'],
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

function buildCentroPracticaReportHtml(values, cpRatings, cpComments, stRatings, stComments, scoreCP, scoreST, totalScore, maxScore, achievement, grade) {
  const summaryRows = [
    ['Fecha y hora', String(values['Marca temporal'])],
    ['Estudiante', values['Nombre estudiante']],
    ['Correo declarado', values['Dirección de correo electrónico']],
    ['Institución / Centro de práctica', values['Nombre Institución']],
    ['Programa institucional', values['Programa'] || 'No especificado'],
    ['Supervisor(a) en terreno', values['Supervisor(a) en terreno']],
    ['Supervisor(a) docente', values['Supervisor(a) docente']],
    ['Semestre evaluado', values['Semestre evaluado'] + ' ' + values['Año']]
  ];
  const summaryHtml = summaryRows.map(entry =>
    '<tr><th>' + escapeHtml(entry[0]) + '</th><td>' + escapeHtml(String(entry[1])) + '</td></tr>'
  ).join('');

  const cpRows = CP_CRITERIA.map((criterion, idx) => {
    const comment = cpComments[idx] ? '<br><em style="color:#52635d">Comentario: ' + escapeHtml(cpComments[idx]) + '</em>' : '';
    return '<tr><td>' + (idx + 1) + '</td><td>' + escapeHtml(criterion) + comment + '</td><td style="text-align:center;font-weight:bold">' + cpRatings[idx] + ' / 5</td></tr>';
  }).join('');

  const stRows = ST_CRITERIA.map((criterion, idx) => {
    const comment = stComments[idx] ? '<br><em style="color:#52635d">Comentario: ' + escapeHtml(stComments[idx]) + '</em>' : '';
    return '<tr><td>' + (idx + 1) + '</td><td>' + escapeHtml(criterion) + comment + '</td><td style="text-align:center;font-weight:bold">' + stRatings[idx] + ' / 5</td></tr>';
  }).join('');

  const obsHtml = values['Observaciones y comentarios generales']
    ? '<p style="white-space:pre-wrap;background:#fafcfb;padding:12px;border:1px solid #cbd7d1;border-radius:4px">' + escapeHtml(values['Observaciones y comentarios generales']) + '</p>'
    : '<p><em>Sin observaciones adicionales.</em></p>';

  return '<!doctype html><html lang="es"><meta charset="utf-8"><style>' +
    'body{font:12px Arial,sans-serif;color:#1d2b29;margin:28px}h1{font-size:20px;color:#28664a;margin-bottom:4px}h2{font-size:14px;color:#315d4b;margin-top:22px;border-bottom:2px solid #28664a;padding-bottom:4px}' +
    '.subtitle{color:#52635d;font-size:13px;margin:0 0 16px}' +
    'table{width:100%;border-collapse:collapse;margin-top:8px}th,td{padding:6px 8px;border:1px solid #cbd7d1;text-align:left;vertical-align:top}' +
    'th{background:#edf3ef}tr{page-break-inside:avoid}' +
    '.result-box{margin-top:18px;padding:14px;background:#edf3ef;border:1px solid #cbd7d1;border-radius:4px}' +
    '</style><body>' +
    '<h1>Evaluación de Centro de Práctica y Supervisión en Terreno</h1>' +
    '<p class="subtitle">Trabajo Social · Práctica Profesional II · Universidad de Aysén</p>' +
    '<h2>Identificación</h2><table>' + summaryHtml + '</table>' +
    '<h2>Dimensión 1: Centro de Práctica (CP) · Escala 0 a 5</h2>' +
    '<table><thead><tr><th style="width:5%">N°</th><th>Descriptor y comentarios</th><th style="width:18%;text-align:center">Puntaje</th></tr></thead><tbody>' + cpRows +
    '<tr><th colspan="2" style="text-align:right">Subtotal Centro de Práctica:</th><td style="text-align:center;font-weight:bold">' + scoreCP + ' / 25</td></tr></tbody></table>' +
    '<h2>Dimensión 2: Supervisor(a) en Terreno (ST) · Escala 0 a 5</h2>' +
    '<table><thead><tr><th style="width:5%">N°</th><th>Descriptor y comentarios</th><th style="width:18%;text-align:center">Puntaje</th></tr></thead><tbody>' + stRows +
    '<tr><th colspan="2" style="text-align:right">Subtotal Supervisor(a) en Terreno:</th><td style="text-align:center;font-weight:bold">' + scoreST + ' / 45</td></tr></tbody></table>' +
    '<h2>Observaciones y comentarios generales</h2>' + obsHtml +
    '<h2>Resultados finales</h2><table class="result-box">' +
    '<tr><th style="width:40%">Puntaje total obtenido</th><td><strong>' + totalScore + ' de ' + maxScore + ' puntos</strong></td></tr>' +
    '<tr><th>Porcentaje de logro</th><td>' + achievement + '%</td></tr>' +
    '<tr><th>Nota calculada (Escala 70% de exigencia)</th><td style="font-size:15px;font-weight:bold;color:#28664a">' + grade.toFixed(1) + '</td></tr>' +
    '</table></body></html>';
}

function getOrCreateCentroPracticaSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CENTRO_PRACTICA_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CENTRO_PRACTICA_SHEET_NAME);
  }
  return sheet;
}

function ensureSheetHeaders(sheet, expectedHeaders) {
  const lastColumn = sheet.getLastColumn();
  if (lastColumn === 0) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    return expectedHeaders;
  }
  const currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
  const normalizedCurrent = currentHeaders.map(normalizeHeader);
  const missing = expectedHeaders.filter(h => !normalizedCurrent.includes(normalizeHeader(h)));
  if (missing.length > 0) {
    sheet.getRange(1, lastColumn + 1, 1, missing.length).setValues([missing]);
    currentHeaders.push(...missing);
  }
  return currentHeaders;
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
