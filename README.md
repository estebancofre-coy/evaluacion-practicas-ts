# Evaluación del proceso de práctica

Portal de evaluación tripartita semestral, alineado con los cuatro Resultados de Aprendizaje Específicos de Práctica Profesional II, que incorpora además la evaluación confidencial de los centros de práctica por parte de las y los estudiantes.

## Componentes

- `index.html`: portada metodológica e interfaz de evaluación con identificación unificada (se solicitan los datos una sola vez). En el perfil de estudiantes, integra de forma conjunta y obligatoria la autoevaluación de competencias formativas y la evaluación confidencial del centro de práctica (sin acceso para supervisores).
- `Code.gs`: validación atómica (exige que el estudiante responda ambos instrumentos para completar el registro), almacenamiento en Google Sheets en pestañas diferenciadas (`Respuestas de formulario 1` y `Evaluación Centro de Práctica`), cálculo de notas y envío automático de copias con dos archivos PDF independientes adjuntos por separado.
- `trabajo_social_color.png`: logo institucional (Universidad de Aysén).
- `integrantes (2).xls`: fuente de estudiantes y asignaciones docentes. En la interfaz solo se muestran nombres, no alias/RUT.

Las formas adaptadas son la [evaluación de supervisión docente](https://forms.gle/8YueS1JaGsUMTirw6), la [autoevaluación](https://forms.gle/8uUPdmENSGJAShwT9) y la pauta de evaluación de centros de práctica. Sus criterios comunes tripartitos se basan en una rúbrica de 20 indicadores que cubre los RAE 1–4 y competencias transversales.

## Instrumentos y flujo de evaluación

1. **Evaluación de supervisores (Terreno y Docente)**:
   - Supervisión en terreno (40% de la evaluación tripartita).
   - Supervisión docente (40% de la evaluación tripartita).
   - Solo evalúan la rúbrica tripartita de 20 criterios sobre el/la estudiante. No tienen acceso a la evaluación de centros de práctica.

2. **Evaluación conjunta de estudiantes (Autoevaluación + Centro de Práctica)**:
   - **Identificación única**: Se ingresan una sola vez al inicio los datos de periodo, estudiante, docente, institución, programa, supervisor en terreno y correo.
   - **Entrega obligatoria y conjunta**: El/la estudiante debe completar obligatoriamente **ambos instrumentos** para que se registre su respuesta:
     - **Pestaña 1 · Autoevaluación de competencias (20% nota tripartita)**: 20 criterios RAE (escala 1 a 4 o No observado) y preguntas de síntesis.
     - **Pestaña 2 · Evaluación del Centro de Práctica (Confidencial)**: 14 criterios calificados de 0 a 5 (5 de Centro de Práctica y 9 de Supervisor en Terreno) con comentarios por descriptor y observaciones generales. Máximo 70 puntos, nota al 70% de exigencia (49 pts = nota 4,0).
   - **Validación**: Si falta responder algún criterio en cualquiera de las dos pestañas, el sistema no permite el envío y no registra respuesta parcial.
   - **Devolución por correo**: Al enviar exitosamente, el backend registra ambos instrumentos en sus respectivas hojas y envía un correo al estudiante entregando **ambos reportes por separado en archivos PDF adjuntos** (`1-Autoevaluacion-...pdf` y `2-Evaluacion-Centro-Practica-...pdf`).

## Materiales

- [Correo de presentación para participantes](docs/correo-presentacion.md)
- [Manual técnico-pedagógico](docs/manual-tecnico-pedagogico.md)

## Configuración y despliegue

1. Abra la hoja de respuestas: https://docs.google.com/spreadsheets/d/1qVxGpBVacPG1R7hPEbKCjVKZKKMg2UlVYBusJ2twHlk/edit. En **Extensiones > Apps Script**, copie el contenido actualizado de `Code.gs` y guarde.
2. Autorice los servicios de Google Sheets y MailApp cuando Apps Script lo solicite (puede ejecutar la función `autorizarMailApp`).
3. En **Implementar > Gestionar implementaciones**, edite la aplicación web activa y publique una versión nueva. Configure la ejecución como su cuenta y el acceso abierto a participantes.
4. Envíe los cambios a la rama `main` en GitHub. El workflow de GitHub Actions desplegará la interfaz actualizada en https://estebancofre-coy.github.io/evaluacion-practicas-ts/.

Los botones **Descargar PDF** permiten previsualizar e imprimir los informes PDF por separado en el navegador antes de enviar.
