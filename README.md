# Evaluación del proceso de práctica

Portal de evaluación tripartita semestral y anual, alineado con los cuatro Resultados de Aprendizaje Específicos de Práctica Profesional II.

## Componentes

- `index.html`: portada metodológica e instrumento común para supervisión en terreno, supervisión docente y autoevaluación.
- `Code.gs`: validación, almacenamiento y cálculo de las notas.
- `trabajo_social_color.png`: logo institucional.
- `integrantes (2).xls`: fuente de estudiantes y asignaciones docentes. En la interfaz solo se muestran nombres, no alias/RUT.

Las formas adaptadas son la [evaluación de supervisión docente](https://forms.gle/8YueS1JaGsUMTirw6) y la [autoevaluación](https://forms.gle/8uUPdmENSGJAShwT9). Sus criterios comunes se reformularon en una rúbrica de 20 indicadores que cubre los RAE 1–4 y competencias transversales. La autoevaluación usa primera persona; las supervisiones, tercera persona.

## Metodología

La evaluación tripartita representa el 25% de la calificación del semestre. El instrumento solo acepta **Primer semestre** o **Segundo semestre**; no registra una observación anual. Dentro del componente tripartito, terreno pesa 40%, docente 40% y autoevaluación 20%. La nota integrada se calcula al contar con las tres perspectivas para el mismo estudiante, instancia y semestre:

`0,4 × nota terreno + 0,4 × nota docente + 0,2 × autoevaluación`

La nota de cada instrumento se calcula entre 4,0 al 70% y 7,0 al 100%, redondeada a un decimal. “No observado” se excluye del puntaje máximo ajustado. Se puede guardar un seguimiento con menos de 16 criterios observados, pero la nota de ese componente queda pendiente.

## Configuración

1. Abra la hoja de respuestas: https://docs.google.com/spreadsheets/d/1qVxGpBVacPG1R7hPEbKCjVKZKKMg2UlVYBusJ2twHlk/edit. En **Extensiones > Apps Script**, copie `Code.gs` y guarde.
2. Autorice los servicios de Google Sheets y MailApp cuando Apps Script lo solicite. En **Implementar > Gestionar implementaciones**, edite la aplicación web y publique una versión nueva. Configure la ejecución como su cuenta y el acceso necesario para participantes.
3. En el repositorio de GitHub, vaya a **Settings > Pages** y elija **GitHub Actions** como fuente de despliegue.
4. Envíe los cambios a la rama `main`. El workflow publicará el frontend en https://estebancofre-coy.github.io/evaluacion-practicas-ts/.

El botón **Descargar PDF** prepara el informe completo y abre el diálogo de impresión del navegador; seleccione “Guardar como PDF”. Al enviar, Apps Script guarda la evaluación y manda al correo ingresado una copia con el PDF adjunto. El correo se guarda como dato declarado, sin validación de identidad. Si el correo falla, la evaluación permanece guardada y la página informa el problema. El workflow solo publica `index.html` y `trabajo_social_color.png`; no expone `Code.gs`, `integrantes (2).xls` ni `programa`.
