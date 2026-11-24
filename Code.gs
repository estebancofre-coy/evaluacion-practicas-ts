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

const DASHBOARD_SHEET_NAME = 'Panel Maestro';

const DASHBOARD_HEADERS = [
  'Estudiante',
  'Periodo de evaluación',
  'Semestre',
  'Institución / Centro',
  'Supervisor(a) docente',
  'Supervisor(a) en terreno',
  'Nota Terreno (40%)',
  'Aporte Terreno',
  'Nota Docente (40%)',
  'Aporte Docente',
  'Nota Autoeval. (20%)',
  'Aporte Autoeval.',
  'Nota Tripartita Final',
  'Estado Tripartito',
  'Eval. Centro Práctica',
  'Nota Centro Práctica',
  'Estado General'
];

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

    // Compatibilidad en caso de llamada aislada a centro_practica
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
    const year = String(parameters.anio || new Date().getFullYear()).trim();
    const recipientEmail = requiredText(parameters.correo, 'correo electrónico');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      throw new Error('Ingrese un correo electrónico válido para recibir la copia.');
    }

    const student = requiredText(parameters.estudiante, 'estudiante');
    const teacher = requiredText(parameters.supervisor_docente, 'supervisor(a) docente');
    if (STUDENT_SUPERVISORS[student] !== teacher) {
      throw new Error('El/la estudiante seleccionado(a) no corresponde al/a la supervisor(a) docente indicado(a).');
    }
    const terrainSupervisor = (roleKey === 'supervision_terreno' || roleKey === 'autoevaluacion')
      ? requiredText(parameters.supervisor, 'supervisor(a) en terreno')
      : '';
    const evaluatorName = roleKey === 'supervision_terreno'
      ? terrainSupervisor
      : roleKey === 'supervision_docente' ? teacher : student;
    const isGeneral = evaluationPeriod === 'Evaluación general';

    // 1. Validar calificaciones de Instrumento 1: Autoevaluación de competencias (20 criterios RAE)
    const ratings = QUESTION_HEADERS.map((header, index) => {
      const rawValue = parameters['q' + (index + 1)];
      if (rawValue === 'NO_OBSERVADO') return null;
      const value = Number(rawValue);
      if (!Number.isInteger(value) || value < 1 || value > 4) {
        throw new Error('Cada criterio de la rúbrica debe tener una calificación entre 1 y 4 o marcarse como No observado.');
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

    // 2. Si es estudiante (autoevaluación), EXIGIR Y VALIDAR Instrumento 2: Evaluación del Centro de Práctica
    let cpData = null;
    if (roleKey === 'autoevaluacion') {
      const cpRatings = [];
      const cpComments = [];
      for (let i = 1; i <= 5; i++) {
        const rawVal = parameters['cp' + i];
        if (rawVal === undefined || rawVal === null || rawVal === '') {
          throw new Error('Para registrar la autoevaluación es obligatorio calificar ambos instrumentos. Falta responder el ítem ' + i + ' de Centro de Práctica.');
        }
        const val = Number(rawVal);
        if (!Number.isInteger(val) || val < 0 || val > 5) {
          throw new Error('Cada ítem del Centro de Práctica debe tener un puntaje válido entre 0 y 5.');
        }
        cpRatings.push(val);
        cpComments.push(String(parameters['cp_comentario_' + i] || '').trim());
      }

      const stRatings = [];
      const stComments = [];
      for (let i = 1; i <= 9; i++) {
        const rawVal = parameters['st' + i];
        if (rawVal === undefined || rawVal === null || rawVal === '') {
          throw new Error('Para registrar la autoevaluación es obligatorio calificar ambos instrumentos. Falta responder el ítem ' + i + ' de Supervisor en Terreno.');
        }
        const val = Number(rawVal);
        if (!Number.isInteger(val) || val < 0 || val > 5) {
          throw new Error('Cada ítem de Supervisor en Terreno debe tener un puntaje válido entre 0 y 5.');
        }
        stRatings.push(val);
        stComments.push(String(parameters['st_comentario_' + i] || '').trim());
      }

      const observacionesCP = String(parameters.observaciones_cp || parameters.observaciones || '').trim();
      const scoreCP = cpRatings.reduce((sum, v) => sum + v, 0);
      const scoreST = stRatings.reduce((sum, v) => sum + v, 0);
      const totalScoreCP = scoreCP + scoreST;
      const maxScoreCP = 70;
      const achievementCP = Math.round((totalScoreCP / maxScoreCP) * 1000) / 10;
      let gradeCP = totalScoreCP >= 49
        ? (4.0 + 3.0 * (totalScoreCP - 49) / 21)
        : (1.0 + 3.0 * totalScoreCP / 49);
      gradeCP = Math.max(1.0, Math.min(7.0, Math.round(gradeCP * 10) / 10));

      const cpValues = {
        'Marca temporal': values['Marca temporal'],
        'Dirección de correo electrónico': recipientEmail,
        'Nombre estudiante': student,
        'Supervisor(a) docente': teacher,
        'Nombre Institución': values['Institución'],
        'Programa': String(parameters.programa || '').trim(),
        'Supervisor(a) en terreno': terrainSupervisor,
        'Semestre evaluado': semester,
        'Año': year,
        'Observaciones y comentarios generales': observacionesCP,
        'Puntaje Centro de Práctica (máx 25)': scoreCP,
        'Puntaje Supervisor(a) en Terreno (máx 45)': scoreST,
        'Puntaje Total (máx 70)': totalScoreCP,
        'Porcentaje de logro (%)': achievementCP,
        'Nota calculada (Escala 70%)': gradeCP
      };

      const cpLabels = ['Espacio de trabajo', 'Instalaciones', 'Clima laboral', 'Trabajo autónomo', 'Participación y opinión'];
      for (let i = 0; i < 5; i++) {
        cpValues['CP ' + (i + 1) + '. ' + cpLabels[i] + ' (0-5)'] = cpRatings[i];
        cpValues['CP ' + (i + 1) + '. Comentarios'] = cpComments[i];
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
        cpValues['ST ' + (i + 1) + '. ' + stLabels[i] + ' (0-5)'] = stRatings[i];
        cpValues['ST ' + (i + 1) + '. Comentarios'] = stComments[i];
      }

      cpData = {
        values: cpValues,
        cpRatings,
        cpComments,
        stRatings,
        stComments,
        scoreCP,
        scoreST,
        totalScore: totalScoreCP,
        maxScore: maxScoreCP,
        achievement: achievementCP,
        grade: gradeCP
      };
    }

    // 3. Almacenamiento seguro en Google Sheets (ambos dentro del bloqueo para consistencia atómica)
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = findResponseSheet(spreadsheet);
    if (!sheet) throw new Error('No se encontró una pestaña con los encabezados de la evaluación tripartita.');

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

      // Si es estudiante, guardar también en la pestaña de Evaluación Centro de Práctica
      if (cpData) {
        const cpSheet = getOrCreateCentroPracticaSheet(spreadsheet);
        const cpHeaders = ensureSheetHeaders(cpSheet, CENTRO_PRACTICA_HEADERS);
        const cpRow = cpHeaders.map(header => {
          const matchKey = Object.keys(cpData.values).find(expected => normalizeHeader(expected) === normalizeHeader(header));
          return matchKey ? cpData.values[matchKey] : '';
        });
        cpSheet.appendRow(cpRow);
      }

      // Sincronizar automáticamente el Panel Maestro consolidado
      try {
        syncMasterDashboard(spreadsheet);
      } catch (dashError) {
        Logger.log('Aviso al actualizar panel maestro: ' + (dashError.message || dashError));
      }
    } finally {
      lock.releaseLock();
    }

    values['Nota integrada tripartita'] = integration.complete ? integration.grade : '';
    values['Estado de integración tripartita'] = integration.complete
      ? 'Completa'
      : 'Pendiente: ' + integration.missing.join(', ');

    // 4. Envío de correos de devolución
    let copyMessage;
    try {
      if (roleKey === 'autoevaluacion' && cpData) {
        // Enviar al estudiante AMBOS instrumentos por separado en el mismo correo
        sendCombinedStudentCopy(values, ratings, componentGrade, integration, cpData);
        copyMessage = 'Se enviaron ambas evaluaciones por separado en archivos PDF adjuntos a ' + recipientEmail + '.';
      } else {
        // Para supervisores, enviar solo su instrumento
        sendEvaluationCopy(values, ratings, componentGrade, integration);
        copyMessage = 'Se envió una copia PDF a ' + recipientEmail + '.';
      }
    } catch (mailError) {
      Logger.log('No se pudo enviar copia a ' + recipientEmail + ': ' + mailError.message);
      copyMessage = 'Las evaluaciones quedaron guardadas en el sistema, pero ocurrió un problema al despachar el correo: ' + (mailError.message || '');
    }

    if (roleKey === 'autoevaluacion') {
      const gradeMessage = componentGrade === ''
        ? 'Nota autoevaluación: Pendiente.'
        : 'Nota autoevaluación: ' + componentGrade.toFixed(1) + '.';
      const cpGradeMessage = 'Nota centro de práctica: ' + cpData.grade.toFixed(1) + '.';
      return renderResult('Evaluaciones registradas con éxito: se guardaron ambos instrumentos (Autoevaluación de competencias y Evaluación del Centro de Práctica). ' + gradeMessage + ' ' + cpGradeMessage + ' ' + copyMessage, true);
    } else {
      const gradeMessage = componentGrade === ''
        ? 'Nota del instrumento pendiente: se requieren al menos 16 criterios observados.'
        : 'Nota del instrumento: ' + componentGrade.toFixed(1) + '.';
      const integrationMessage = integration.complete
        ? 'Nota tripartita integrada: ' + integration.grade.toFixed(1) + '.'
        : 'Integración tripartita pendiente: ' + integration.missing.join(', ') + '.';
      return renderResult('Evaluación registrada: ' + role.label + ' (' + role.weight + '%). Puntaje ' + score + ' de ' + maximumScore + ' (' + Math.round(achievement * 100) + '%). ' + gradeMessage + ' ' + integrationMessage + ' ' + copyMessage, true);
    }
  } catch (error) {
    return renderResult(error.message || 'No fue posible guardar la evaluación.', false);
  }
}

// Envío conjunto para estudiantes: entrega ambos instrumentos por separado en el mismo correo
function sendCombinedStudentCopy(values, ratings, componentGrade, integration, cpData) {
  if (MailApp.getRemainingDailyQuota() < 1) {
    throw new Error('Se agotó la cuota diaria de correo del formulario.');
  }

  const evaluationKey = [
    values['Dirección de correo electrónico'].toLowerCase(),
    values['Nombre estudiante supervisado(a)'],
    values['Periodo de evaluación'],
    values['Semestre evaluado'],
    'estudiante_combinado'
  ].join('|');
  const cache = CacheService.getScriptCache();
  const cacheKey = 'student-combined-copy:' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, evaluationKey)
  );
  if (cache.get(cacheKey)) {
    throw new Error('Ya se envió una copia de esta evaluación recientemente.');
  }
  cache.put(cacheKey, 'sending', 300);

  try {
    // 1. Generar PDF independiente de Autoevaluación
    const autoHtml = buildEvaluationReportHtml(values, ratings, componentGrade, integration);
    const pdfAutoevaluacion = HtmlService.createHtmlOutput(autoHtml)
      .getBlob()
      .getAs(MimeType.PDF)
      .setName('1-Autoevaluacion-' + safeFileName(values['Nombre estudiante supervisado(a)']) + '.pdf');

    // 2. Generar PDF independiente de Evaluación de Centro de Práctica
    const cpReportHtml = buildCentroPracticaReportHtml(
      cpData.values,
      cpData.cpRatings,
      cpData.cpComments,
      cpData.stRatings,
      cpData.stComments,
      cpData.scoreCP,
      cpData.scoreST,
      cpData.totalScore,
      cpData.maxScore,
      cpData.achievement,
      cpData.grade
    );
    const pdfCentroPractica = HtmlService.createHtmlOutput(cpReportHtml)
      .getBlob()
      .getAs(MimeType.PDF)
      .setName('2-Evaluacion-Centro-Practica-' + safeFileName(values['Nombre estudiante supervisado(a)']) + '.pdf');

    const plainText = [
      'Estimada/o estudiante ' + values['Nombre estudiante supervisado(a)'] + ':',
      '',
      'Se ha registrado exitosamente la entrega de tus dos instrumentos obligatorios de evaluación de práctica.',
      'Adjunto a este correo encontrarás ambos informes en PDF entregados por separado:',
      '',
      '==============================================================',
      '1. AUTOEVALUACIÓN DE COMPETENCIAS (20% NOTA TRIPARTITA)',
      '==============================================================',
      'Instancia: ' + values['Periodo de evaluación'],
      'Semestre: ' + values['Semestre evaluado'],
      'Puntaje: ' + values['Puntaje'] + ' de ' + values['Puntaje máximo ajustado'] + ' (' + values['Porcentaje de logro (%)'] + '%)',
      'Nota autoevaluación: ' + (componentGrade === '' ? 'Pendiente' : componentGrade.toFixed(1)),
      'Archivo adjunto: 1-Autoevaluacion-' + safeFileName(values['Nombre estudiante supervisado(a)']) + '.pdf',
      '',
      '==============================================================',
      '2. EVALUACIÓN DE CENTRO DE PRÁCTICA Y SUPERVISIÓN EN TERRENO',
      '==============================================================',
      'Centro de práctica: ' + cpData.values['Nombre Institución'],
      'Supervisor(a) en terreno: ' + cpData.values['Supervisor(a) en terreno'],
      'Puntaje total: ' + cpData.totalScore + ' de 70 (' + cpData.achievement + '%)',
      'Nota calculada (Exigencia 70%): ' + cpData.grade.toFixed(1),
      'Archivo adjunto: 2-Evaluacion-Centro-Practica-' + safeFileName(values['Nombre estudiante supervisado(a)']) + '.pdf',
      '',
      'Conserva ambos archivos como comprobante académico.'
    ].join('\n');

    const combinedHtml = buildCombinedEmailHtml(values, ratings, componentGrade, integration, cpData);

    MailApp.sendEmail({
      to: values['Dirección de correo electrónico'],
      subject: 'Devolución de evaluaciones de práctica · ' + values['Nombre estudiante supervisado(a)'],
      body: plainText,
      htmlBody: combinedHtml,
      attachments: [pdfAutoevaluacion, pdfCentroPractica],
      name: 'Evaluación de Prácticas Profesionales'
    });
  } catch (error) {
    cache.remove(cacheKey);
    throw error;
  }
}

function buildCombinedEmailHtml(values, ratings, componentGrade, integration, cpData) {
  const student = escapeHtml(values['Nombre estudiante supervisado(a)']);
  const integrationText = integration.complete
    ? integration.grade.toFixed(1)
    : 'Pendiente: ' + escapeHtml(integration.missing.join(', '));

  return '<!doctype html><html lang="es"><meta charset="utf-8"><style>' +
    'body{font:13px Arial,sans-serif;color:#1d2b29;background:#f4f6f2;margin:0;padding:24px}' +
    '.card{max-width:680px;margin:0 auto;background:#fff;border-radius:6px;border:1px solid #cbd7d1;padding:24px}' +
    'h1{font-size:19px;color:#28664a;margin-top:0}' +
    'h2{font-size:15px;color:#315d4b;margin-top:24px;border-bottom:2px solid #28664a;padding-bottom:5px}' +
    'table{width:100%;border-collapse:collapse;margin:10px 0}th,td{padding:6px 9px;border:1px solid #cbd7d1;text-align:left;vertical-align:top}' +
    'th{width:36%;background:#edf3ef}' +
    '.notice-box{margin:14px 0;padding:12px 16px;background:#e8f4f8;border-left:4px solid #287c88;border-radius:4px;color:#174c54;font-size:12.5px;line-height:1.5}' +
    '.attach-box{margin:14px 0;padding:12px 16px;background:#edf3ef;border-radius:4px;font-size:12.5px}' +
    '.score-badge{font-size:15px;font-weight:bold;color:#28664a}' +
    '</style><body><div class="card">' +
    '<h1>Devolución de Evaluaciones de Práctica Profesional</h1>' +
    '<p>Estimada/o <strong>' + student + '</strong>,</p>' +
    '<p>Se ha recibido satisfactoriamente la entrega obligatoria de tus dos instrumentos de evaluación de práctica.</p>' +
    '<div class="attach-box"><strong>Archivos PDF adjuntos por separado:</strong><br>' +
    '📄 <strong>1-Autoevaluacion-' + safeFileName(values['Nombre estudiante supervisado(a)']) + '.pdf</strong> (Autoevaluación de competencias formativas)<br>' +
    '📄 <strong>2-Evaluacion-Centro-Practica-' + safeFileName(values['Nombre estudiante supervisado(a)']) + '.pdf</strong> (Evaluación confidencial del centro y supervisión en terreno)</div>' +
    '<h2>1. Instrumento de Autoevaluación (Pondera 20%)</h2>' +
    '<table>' +
    '<tr><th>Instancia y periodo</th><td>' + escapeHtml(values['Periodo de evaluación']) + ' · ' + escapeHtml(values['Semestre evaluado']) + ' ' + escapeHtml(values['Año'] || '') + '</td></tr>' +
    '<tr><th>Supervisor(a) docente</th><td>' + escapeHtml(values['Supervisor(a) docente']) + '</td></tr>' +
    '<tr><th>Centro de práctica</th><td>' + escapeHtml(values['Institución']) + '</td></tr>' +
    '<tr><th>Puntaje autoevaluación</th><td>' + values['Puntaje'] + ' de ' + values['Puntaje máximo ajustado'] + ' (' + values['Porcentaje de logro (%)'] + '%)</td></tr>' +
    '<tr><th>Nota del instrumento</th><td class="score-badge">' + (componentGrade === '' ? 'Pendiente' : componentGrade.toFixed(1)) + '</td></tr>' +
    '<tr><th>Nota tripartita integrada</th><td>' + integrationText + '</td></tr>' +
    '</table>' +
    '<h2>2. Instrumento de Evaluación del Centro de Práctica (Confidencial)</h2>' +
    '<div class="notice-box">Este instrumento es confidencial. La supervisión en terreno y docente no tienen acceso a tus calificaciones ni comentarios.</div>' +
    '<table>' +
    '<tr><th>Centro de práctica</th><td>' + escapeHtml(cpData.values['Nombre Institución']) + '</td></tr>' +
    '<tr><th>Programa institucional</th><td>' + escapeHtml(cpData.values['Programa'] || 'No especificado') + '</td></tr>' +
    '<tr><th>Supervisor(a) en terreno</th><td>' + escapeHtml(cpData.values['Supervisor(a) en terreno']) + '</td></tr>' +
    '<tr><th>Subtotal Centro de Práctica</th><td>' + cpData.scoreCP + ' de 25 puntos</td></tr>' +
    '<tr><th>Subtotal Supervisor(a) en Terreno</th><td>' + cpData.scoreST + ' de 45 puntos</td></tr>' +
    '<tr><th>Puntaje Total</th><td>' + cpData.totalScore + ' de 70 puntos (' + cpData.achievement + '%)</td></tr>' +
    '<tr><th>Nota calculada (Exigencia 70%)</th><td class="score-badge">' + cpData.grade.toFixed(1) + '</td></tr>' +
    '</table>' +
    '<p style="color:#52635d;font-size:11.5px;margin-top:20px;border-top:1px solid #e4eae6;padding-top:12px">Universidad de Aysén · Departamento de Ciencias Sociales y Humanidades · Trabajo Social</p>' +
    '</div></body></html>';
}

function handleCentroPractica(parameters) {
  const student = requiredText(parameters.estudiante, 'estudiante');
  const teacher = requiredText(parameters.supervisor_docente || STUDENT_SUPERVISORS[student], 'supervisor(a) docente');
  const institution = requiredText(parameters.institucion, 'nombre de la institución / centro de práctica');
  const program = String(parameters.programa || '').trim();
  const terrainSupervisor = requiredText(parameters.supervisor_terreno || parameters.supervisor, 'supervisor(a) en terreno');
  const semester = requiredText(parameters.semestre, 'semestre evaluado');
  if (!['Primer semestre', 'Segundo semestre'].includes(semester)) {
    throw new Error('El semestre evaluado debe ser Primer semestre o Segundo semestre.');
  }
  const year = requiredText(parameters.anio, 'año');
  const recipientEmail = requiredText(parameters.correo, 'correo electrónico');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
    throw new Error('Ingrese un correo electrónico válido para recibir la copia.');
  }

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

  const observaciones = String(parameters.observaciones_cp || parameters.observaciones || '').trim();
  const scoreCP = cpRatings.reduce((sum, v) => sum + v, 0);
  const scoreST = stRatings.reduce((sum, v) => sum + v, 0);
  const totalScore = scoreCP + scoreST;
  const maxScore = 70;
  const achievement = Math.round((totalScore / maxScore) * 1000) / 10;

  let grade = totalScore >= 49
    ? (4.0 + 3.0 * (totalScore - 49) / 21)
    : (1.0 + 3.0 * totalScore / 49);
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
    try {
      syncMasterDashboard(spreadsheet);
    } catch (dashError) {
      Logger.log('Aviso al actualizar panel maestro: ' + (dashError.message || dashError));
    }
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
    '<title>Resultado de evaluación</title><body style="margin:0;padding:32px;background:#f4f6f2;font:16px Segoe UI,sans-serif;color:#1d2b29">' +
    '<main style="max-width:640px;margin:10vh auto;padding:28px;background:#fff;border-top:5px solid ' + color + '">' +
    '<h1 style="font-size:24px">' + (success ? 'Evaluación recibida' : 'No se pudo enviar') + '</h1>' +
    '<p>' + escapedMessage + '</p></main></body></html>'
  );
}

// Menú contextual para administradores y docentes en Google Sheets
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Evaluaciones de Práctica')
    .addItem('📊 Actualizar Panel Maestro', 'menuActualizarDashboard')
    .addItem('✉️ Consultar cuota de correos', 'menuVerificarCuota')
    .addToUi();
}

function menuActualizarDashboard() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  syncMasterDashboard(spreadsheet);
  SpreadsheetApp.getUi().alert('Panel Maestro actualizado exitosamente.');
}

function menuVerificarCuota() {
  const cuota = MailApp.getRemainingDailyQuota();
  SpreadsheetApp.getUi().alert('Cuota diaria restante de correos: ' + cuota + ' envíos.');
}

// Sincronización automática de la Pestaña Maestra (Dashboard Consolidado)
function syncMasterDashboard(spreadsheet) {
  const triSheet = findResponseSheet(spreadsheet);
  if (!triSheet) {
    Logger.log('No se encontró hoja tripartita para sincronizar el panel maestro.');
    return;
  }

  // 1. Mapeo de Evaluaciones de Centro de Práctica (confidencial de estudiantes)
  const cpLookup = {};
  const cpSheet = spreadsheet.getSheetByName(CENTRO_PRACTICA_SHEET_NAME);
  if (cpSheet && cpSheet.getLastRow() >= 2) {
    const cpHeaders = cpSheet.getRange(1, 1, 1, cpSheet.getLastColumn()).getDisplayValues()[0];
    const cpData = cpSheet.getRange(2, 1, cpSheet.getLastRow() - 1, cpHeaders.length).getValues();
    const cpCol = {};
    cpHeaders.forEach((h, i) => { cpCol[normalizeHeader(h)] = i; });

    cpData.forEach(row => {
      const stName = normalizeHeader(row[cpCol[normalizeHeader('Nombre estudiante')]]);
      const sem = normalizeHeader(row[cpCol[normalizeHeader('Semestre evaluado')]]);
      const grade = row[cpCol[normalizeHeader('Nota calculada (Escala 70%)')]];
      const key = stName + '|' + sem;
      cpLookup[key] = { hasEval: true, grade: grade };
      if (!cpLookup[stName]) {
        cpLookup[stName] = { hasEval: true, grade: grade };
      }
    });
  }

  // 2. Mapeo y agrupamiento de Respuestas Tripartitas
  const lastRow = triSheet.getLastRow();
  const triHeaders = triSheet.getRange(1, 1, 1, triSheet.getLastColumn()).getDisplayValues()[0];
  const col = {};
  triHeaders.forEach((h, i) => { col[normalizeHeader(h)] = i; });

  const studentCol = col[normalizeHeader('Nombre estudiante supervisado(a)')];
  const periodCol = col[normalizeHeader('Periodo de evaluación')];
  const semesterCol = col[normalizeHeader('Semestre evaluado')];
  const instCol = col[normalizeHeader('Institución')];
  const docCol = col[normalizeHeader('Supervisor(a) docente')];
  const terCol = col[normalizeHeader('Nombre supervisor(a) Institución')];
  const roleCol = col[normalizeHeader('Rol evaluador')];
  const gradeCol = col[normalizeHeader('Nota')];

  const evaluationsMap = {};

  if (lastRow >= 2) {
    const triRows = triSheet.getRange(2, 1, lastRow - 1, triHeaders.length).getValues();
    triRows.forEach(row => {
      const student = String(row[studentCol] || '').trim();
      const period = String(row[periodCol] || 'Evaluación general').trim();
      const semester = String(row[semesterCol] || 'Primer semestre').trim();
      if (!student) return;

      const groupKey = normalizeHeader(student) + '|' + normalizeHeader(period) + '|' + normalizeHeader(semester);
      if (!evaluationsMap[groupKey]) {
        evaluationsMap[groupKey] = {
          student: student,
          period: period,
          semester: semester,
          institution: String(row[instCol] || '').trim(),
          docente: String(row[docCol] || STUDENT_SUPERVISORS[student] || '').trim(),
          terrain: String(row[terCol] || '').trim(),
          terrenoGrade: '',
          terrenoAporte: '',
          docenteGrade: '',
          docenteAporte: '',
          autoGrade: '',
          autoAporte: '',
          integratedGrade: '',
          tripartiteStatus: '',
          hasCpEval: false,
          cpGrade: '',
          generalStatus: ''
        };
      }

      const rec = evaluationsMap[groupKey];
      if (!rec.institution && row[instCol]) rec.institution = String(row[instCol]).trim();
      if (!rec.terrain && row[terCol]) rec.terrain = String(row[terCol]).trim();
      if (!rec.docente && row[docCol]) rec.docente = String(row[docCol]).trim();

      const roleLabel = normalizeHeader(row[roleCol]);
      const rawGrade = row[gradeCol];
      const numGrade = (typeof rawGrade === 'number' && Number.isFinite(rawGrade)) ? rawGrade : null;

      if (roleLabel === normalizeHeader('Supervisión en terreno')) {
        rec.terrenoGrade = numGrade !== null ? numGrade : '';
        rec.terrenoAporte = numGrade !== null ? Math.round(numGrade * 40) / 100 : '';
        if (row[terCol]) rec.terrain = String(row[terCol]).trim();
      } else if (roleLabel === normalizeHeader('Supervisión docente')) {
        rec.docenteGrade = numGrade !== null ? numGrade : '';
        rec.docenteAporte = numGrade !== null ? Math.round(numGrade * 40) / 100 : '';
        if (row[docCol]) rec.docente = String(row[docCol]).trim();
      } else if (roleLabel === normalizeHeader('Autoevaluación')) {
        rec.autoGrade = numGrade !== null ? numGrade : '';
        rec.autoAporte = numGrade !== null ? Math.round(numGrade * 20) / 100 : '';
      }
    });
  }

  // 3. Garantizar que todos los estudiantes oficiales aparezcan en el panel aunque aún no tengan evaluaciones
  Object.keys(STUDENT_SUPERVISORS).forEach(studentName => {
    const defaultPeriod = 'Seguimiento intermedio';
    const defaultSem = 'Primer semestre';
    const existingKey = Object.keys(evaluationsMap).find(k => k.startsWith(normalizeHeader(studentName) + '|'));
    if (!existingKey) {
      const newKey = normalizeHeader(studentName) + '|' + normalizeHeader(defaultPeriod) + '|' + normalizeHeader(defaultSem);
      evaluationsMap[newKey] = {
        student: studentName,
        period: defaultPeriod,
        semester: defaultSem,
        institution: '',
        docente: STUDENT_SUPERVISORS[studentName] || '',
        terrain: '',
        terrenoGrade: '',
        terrenoAporte: '',
        docenteGrade: '',
        docenteAporte: '',
        autoGrade: '',
        autoAporte: '',
        integratedGrade: '',
        tripartiteStatus: 'Sin evaluaciones',
        hasCpEval: false,
        cpGrade: '',
        generalStatus: 'Sin iniciar'
      };
    }
  });

  // 4. Calcular notas integradas, cruce con Centro de Práctica y estados
  const records = Object.values(evaluationsMap);
  records.forEach(rec => {
    const hasT = typeof rec.terrenoGrade === 'number';
    const hasD = typeof rec.docenteGrade === 'number';
    const hasA = typeof rec.autoGrade === 'number';

    if (hasT && hasD && hasA) {
      rec.integratedGrade = Math.round((rec.terrenoGrade * 0.4 + rec.docenteGrade * 0.4 + rec.autoGrade * 0.2) * 10) / 10;
      rec.tripartiteStatus = 'Completa';
    } else if (rec.tripartiteStatus !== 'Sin evaluaciones') {
      const missing = [];
      if (!hasT) missing.push('Terreno');
      if (!hasD) missing.push('Docente');
      if (!hasA) missing.push('Autoevaluación');
      rec.tripartiteStatus = 'Pendiente: ' + missing.join(', ');
      rec.integratedGrade = '';
    }

    // Cruce con evaluación de Centro de Práctica
    const cpMatch = cpLookup[normalizeHeader(rec.student) + '|' + normalizeHeader(rec.semester)] || cpLookup[normalizeHeader(rec.student)];
    if (cpMatch && cpMatch.hasEval) {
      rec.hasCpEval = true;
      rec.cpGrade = cpMatch.grade;
    } else {
      rec.hasCpEval = false;
      rec.cpGrade = '';
    }

    // Estado General del proceso formativo
    if (rec.tripartiteStatus === 'Completa' && rec.hasCpEval) {
      rec.generalStatus = 'Al día (100%)';
    } else if (rec.tripartiteStatus === 'Completa' && !rec.hasCpEval) {
      rec.generalStatus = 'Pendiente Eval. Centro';
    } else if (rec.hasCpEval && rec.tripartiteStatus !== 'Completa') {
      rec.generalStatus = 'En proceso (Falta supervisión)';
    } else if (rec.tripartiteStatus !== 'Sin evaluaciones') {
      rec.generalStatus = 'En proceso';
    } else {
      rec.generalStatus = 'Sin iniciar';
    }
  });

  // Ordenar por Supervisor(a) Docente y luego por Estudiante
  records.sort((a, b) => {
    const compDoc = (a.docente || '').localeCompare(b.docente || '');
    if (compDoc !== 0) return compDoc;
    return (a.student || '').localeCompare(b.student || '');
  });

  // 5. Crear o actualizar la pestaña 'Panel Maestro'
  let dashSheet = spreadsheet.getSheetByName(DASHBOARD_SHEET_NAME);
  if (!dashSheet) {
    dashSheet = spreadsheet.insertSheet(DASHBOARD_SHEET_NAME);
  }

  dashSheet.clear();

  // Encabezados con formato institucional
  dashSheet.getRange(1, 1, 1, DASHBOARD_HEADERS.length)
    .setValues([DASHBOARD_HEADERS])
    .setBackground('#28664a')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  dashSheet.setRowHeight(1, 34);
  dashSheet.setFrozenRows(1);
  dashSheet.setFrozenColumns(1);

  if (records.length === 0) return;

  const rows = records.map(r => [
    r.student,
    r.period,
    r.semester,
    r.institution || '',
    r.docente || '',
    r.terrain || '',
    typeof r.terrenoGrade === 'number' ? r.terrenoGrade : '',
    typeof r.terrenoAporte === 'number' ? r.terrenoAporte : '',
    typeof r.docenteGrade === 'number' ? r.docenteGrade : '',
    typeof r.docenteAporte === 'number' ? r.docenteAporte : '',
    typeof r.autoGrade === 'number' ? r.autoGrade : '',
    typeof r.autoAporte === 'number' ? r.autoAporte : '',
    typeof r.integratedGrade === 'number' ? r.integratedGrade : '',
    r.tripartiteStatus,
    r.hasCpEval === true,
    typeof r.cpGrade === 'number' ? r.cpGrade : (r.cpGrade || ''),
    r.generalStatus
  ]);

  const numRows = rows.length;
  const numCols = DASHBOARD_HEADERS.length;
  dashSheet.getRange(2, 1, numRows, numCols).setValues(rows);

  // Formato numérico y estilos
  dashSheet.getRange(2, 7, numRows, 1).setNumberFormat('0.0').setHorizontalAlignment('center'); // Terreno
  dashSheet.getRange(2, 8, numRows, 1).setNumberFormat('0.00').setHorizontalAlignment('center'); // Aporte Terreno
  dashSheet.getRange(2, 9, numRows, 1).setNumberFormat('0.0').setHorizontalAlignment('center'); // Docente
  dashSheet.getRange(2, 10, numRows, 1).setNumberFormat('0.00').setHorizontalAlignment('center'); // Aporte Docente
  dashSheet.getRange(2, 11, numRows, 1).setNumberFormat('0.0').setHorizontalAlignment('center'); // Auto
  dashSheet.getRange(2, 12, numRows, 1).setNumberFormat('0.00').setHorizontalAlignment('center'); // Aporte Auto
  dashSheet.getRange(2, 13, numRows, 1).setNumberFormat('0.0').setFontWeight('bold').setHorizontalAlignment('center'); // Final Tripartita
  dashSheet.getRange(2, 14, numRows, 1).setHorizontalAlignment('center'); // Estado Tripartito

  // Checkboxes nativos en Columna 15 (Eval. Centro Práctica)
  const cbRange = dashSheet.getRange(2, 15, numRows, 1);
  cbRange.insertCheckboxes().setHorizontalAlignment('center');

  dashSheet.getRange(2, 16, numRows, 1).setNumberFormat('0.0').setHorizontalAlignment('center'); // Nota Centro
  dashSheet.getRange(2, 17, numRows, 1).setHorizontalAlignment('center').setFontWeight('bold'); // Estado General

  // Anchos recomendados de columna para legibilidad óptima
  const colWidths = [210, 160, 120, 180, 160, 160, 110, 95, 110, 95, 110, 95, 125, 160, 140, 120, 150];
  colWidths.forEach((w, i) => dashSheet.setColumnWidth(i + 1, w));
}

