# Evaluación del proceso de práctica

Portal de evaluación tripartita semestral, alineado con los cuatro Resultados de Aprendizaje Específicos de Práctica Profesional II, que incorpora además la evaluación confidencial de los centros de práctica por parte de las y los estudiantes.

## Componentes

- `index.html`: portada metodológica e instrumento común para supervisión en terreno, supervisión docente y autoevaluación. En la sección de estudiantes, incorpora un formulario paralelo y confidencial para la evaluación del centro de práctica y de la supervisión en terreno (sin acceso para supervisores).
- `Code.gs`: validación, almacenamiento en Google Sheets (en pestañas diferenciadas para la evaluación tripartita y la evaluación de centros de práctica), cálculo de notas y envío automático de copias con informe PDF vía correo electrónico.
- `trabajo_social_color.png`: logo institucional (Universidad de Aysén).
- `integrantes (2).xls`: fuente de estudiantes y asignaciones docentes. En la interfaz solo se muestran nombres, no alias/RUT.

Las formas adaptadas son la [evaluación de supervisión docente](https://forms.gle/8YueS1JaGsUMTirw6), la [autoevaluación](https://forms.gle/8uUPdmENSGJAShwT9) y la pauta de evaluación de centros de práctica. Sus criterios comunes tripartitos se basan en una rúbrica de 20 indicadores que cubre los RAE 1–4 y competencias transversales.

## Instrumentos disponibles

1. **Evaluación tripartita de desempeño (25% de la calificación semestral)**:
   - Supervisión en terreno (40%).
   - Supervisión docente (40%).
   - Autoevaluación del/de la estudiante (20%).
   - Cálculo integrado: `0,4 × nota terreno + 0,4 × nota docente + 0,2 × autoevaluación`.
   - Exigencia de 70% para nota 4,0 y 100% para nota 7,0 (escala 1 a 4 por criterio). Se requiere un mínimo de 16 criterios observados.

2. **Evaluación de Centro de Práctica y Supervisión en Terreno (Exclusivo estudiantes)**:
   - Formulario paralelo disponible únicamente dentro del perfil de estudiante (`Autoevaluación`).
   - Confidencial: los supervisores docentes y en terreno no tienen acceso a este formulario ni a sus respuestas.
   - Estructura:
     - Dimensión 1: Centro de Práctica (5 descriptores, escala 0 a 5, con comentarios por ítem).
     - Dimensión 2: Supervisor(a) en Terreno (9 descriptores, escala 0 a 5, con comentarios por ítem).
     - Observaciones y comentarios generales.
   - Puntaje y nota: 14 ítems calificados de 0 a 5 (máximo 70 puntos). Nota en escala de 1,0 a 7,0 con exigencia del 70% (49 puntos para nota 4,0).
   - Al enviar, se registra en la pestaña **Evaluación Centro de Práctica** de la hoja de cálculo y se envía automáticamente un correo al estudiante con el informe en PDF adjunto.

## Materiales

- [Correo de presentación para participantes](docs/correo-presentacion.md)
- [Manual técnico-pedagógico](docs/manual-tecnico-pedagogico.md)

## Configuración y despliegue

1. Abra la hoja de respuestas: https://docs.google.com/spreadsheets/d/1qVxGpBVacPG1R7hPEbKCjVKZKKMg2UlVYBusJ2twHlk/edit. En **Extensiones > Apps Script**, copie el contenido actualizado de `Code.gs` y guarde.
2. Autorice los servicios de Google Sheets y MailApp cuando Apps Script lo solicite (puede ejecutar la función `autorizarMailApp`).
3. En **Implementar > Gestionar implementaciones**, edite la aplicación web y publique una versión nueva. Configure la ejecución como su cuenta y el acceso necesario para participantes.
4. Envíe los cambios a la rama `main` en GitHub. El workflow de GitHub Actions desplegará la interfaz actualizada en https://estebancofre-coy.github.io/evaluacion-practicas-ts/.

El botón **Descargar PDF** prepara el informe completo y abre el diálogo de impresión del navegador en cualquiera de los formularios. Al enviar, Apps Script guarda la evaluación y manda al correo ingresado una copia con el PDF adjunto. Si el correo falla por cuota o error de red, la evaluación permanece guardada en la hoja y la página informa el problema.
