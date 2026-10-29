# Manual técnico-pedagógico

**Instrumento tripartito de evaluación de Práctica Profesional II**
**Versión:** 1.0 · **Ámbito:** Primer o segundo semestre

## 1. Propósito

El instrumento reúne tres perspectivas del proceso de práctica: supervisión en terreno, supervisión docente y autoevaluación. Su objetivo pedagógico es valorar avances y evidencias del periodo, reconocer el aporte del/de la estudiante al trabajo del centro y acordar desafíos de desarrollo. No reemplaza la supervisión, la retroalimentación ni los demás productos académicos del curso.

El instrumento responde a los cuatro resultados de aprendizaje específicos del programa: ajuste del plan y seguimiento; implementación de la intervención; evaluación y sistematización; y reflexión ética. Añade competencias transversales de responsabilidad, autonomía, colaboración y comunicación profesional.

## 2. Ponderación

La evaluación tripartita aporta el **25% de la calificación del semestre**. Dentro de ese componente, cada perspectiva tiene esta ponderación:

| Perspectiva | Peso del componente tripartito |
|---|---:|
| Supervisión en terreno | 40% |
| Supervisión docente | 40% |
| Autoevaluación del/de la estudiante | 20% |

La nota integrada se calcula cuando están registradas las tres perspectivas para el mismo estudiante, instancia y semestre:

`Nota tripartita = 0,4 × nota terreno + 0,4 × nota docente + 0,2 × autoevaluación`

La contribución de este componente a la nota final del curso corresponde a `0,25 × nota tripartita`, según el esquema de ponderación definido en el programa.

## 3. Rúbrica y cálculo

El instrumento contiene 20 criterios con escala de 1 a 4. Los anclajes son:

| Nivel | Descriptor |
|---|---|
| 1 · Inicial | Requiere guía permanente; el desempeño todavía no alcanza lo esperado. |
| 2 · En desarrollo | Avance parcial o irregular; requiere orientación frecuente. |
| 3 · Logro esperado | Desempeño consistente para la etapa, con apoyos puntuales. |
| 4 · Destacado | Desempeño autónomo, consistente y fundamentado. |

“**No observado**” se utiliza cuando no hubo una oportunidad suficiente para evaluar el criterio; no equivale a cero ni a desempeño insuficiente. El puntaje máximo se ajusta al número de criterios puntuados. Se puede guardar un seguimiento con menos de 16 criterios observados, pero no se emite nota de componente hasta alcanzar ese mínimo.

El porcentaje de logro es `puntaje obtenido / puntaje máximo ajustado`. La conversión establece 4,0 al 70% y 7,0 al 100%, con interpolación lineal, redondeo a un decimal y límite entre 1,0 y 7,0.

## 4. Uso por participante

1. Abra el portal: [Evaluación del proceso de práctica](https://estebancofre-coy.github.io/evaluacion-practicas-ts/).
2. Elija uno de los tres roles. Cada participante responde solo desde su perspectiva.
3. Seleccione la instancia (**Seguimiento intermedio**, **Cierre semestral** o **Evaluación general**) y el periodo (**Primer semestre** o **Segundo semestre**). “Evaluación general” adapta la síntesis, pero no representa una evaluación anual.
4. Seleccione al/a la estudiante. El portal asigna el/la supervisor(a) docente según la nómina. Supervisión en terreno ingresa además su nombre.
5. Responda los 20 criterios. Utilice “No observado” con criterio y complete las preguntas abiertas con evidencia o reflexión pertinente.
6. Complete el correo y el centro de práctica. El correo se registra como texto declarado, sin autenticación ni verificación de identidad.
7. Use **Descargar PDF** para abrir la vista imprimible y seleccione “Guardar como PDF” en el navegador. Use **Enviar evaluación y recibir copia por correo** para guardar la respuesta y pedir una copia PDF al correo indicado.

Las preguntas abiertas cambian de voz según el rol. En supervisión describen conductas observadas; en autoevaluación están redactadas en primera persona. En “Evaluación general” la síntesis cambia para orientar fortalezas y proyección; además se solicitan recomendaciones profesionales y una idea de tesis 2027 sobre el fenómeno general de la institución.

## 5. Criterios pedagógicos para responder

- Fundamente la calificación en evidencias del semestre y en oportunidades reales de observación.
- Distinga desempeño observado de potencial o expectativa; use “No observado” si corresponde.
- Considere el momento del proceso: los criterios pueden tener distinto grado de desarrollo en seguimiento y cierre.
- En las respuestas abiertas, describa fortalezas, desafíos y acuerdos accionables para el periodo siguiente.
- No incorpore nombres ni datos que identifiquen a usuarios, familias o comunidades. Mantenga la confidencialidad y anonimice ejemplos.
- La evaluación reconoce tanto aprendizajes como la contribución del/de la estudiante al centro; no es una valoración de usuarios ni una encuesta de satisfacción institucional.

## 6. Qué ocurre al enviar

Apps Script valida rol, estudiante-supervisor docente, periodo y calificaciones; registra las respuestas en la hoja vinculada, conserva las columnas históricas y agrega las nuevas columnas de rúbrica y ponderación cuando corresponda. Al completar las tres perspectivas compatibles, actualiza la nota tripartita integrada.

La evaluación se guarda antes de intentar enviar el correo. Si MailApp no está autorizado, se agotó la cuota diaria o el correo no se puede entregar, la respuesta permanece en la hoja y la pantalla informa que falló el envío de la copia. El correo ingresado no está autenticado; revise que no tenga errores. Se aplica un control temporal para evitar duplicar copias de una misma perspectiva durante cinco minutos.

## 7. Operación técnica

### Componentes y publicación

- GitHub Pages sirve `index.html` y `trabajo_social_color.png` desde `main` mediante `.github/workflows/deploy-pages.yml`.
- Apps Script (`Code.gs`) escribe en la hoja y usa `MailApp` para adjuntar el PDF. GitHub Pages no publica ni sincroniza `Code.gs`.
- La dirección pública del portal es https://estebancofre-coy.github.io/evaluacion-practicas-ts/.
- El repositorio omite la nómina `.xls` y el archivo `programa` del artefacto público.

### Actualizar Apps Script

1. Abra la hoja de respuestas y entre a **Extensiones > Apps Script**.
2. Copie el contenido vigente de `Code.gs` del repositorio y guarde el proyecto.
3. En el selector de funciones, ejecute `autorizarMailApp` y conceda permisos de Sheets y correo desde la cuenta propietaria del script. La función registra la cuota diaria disponible.
4. En **Implementar > Gestionar implementaciones**, edite la aplicación web y publique una versión nueva. Mantenga ejecución como propietario y el acceso configurado para quienes responderán.
5. Envíe una prueba controlada de cada perspectiva y confirme fila, nota y copia PDF. Verifique que la nota integrada aparezca después de la tercera perspectiva compatible.

### Problemas frecuentes

| Síntoma | Revisión |
|---|---|
| La página no carga tras actualizar `main` | Revise **Actions** y que Pages use **GitHub Actions**. Espere a que termine el workflow. |
| La hoja no recibe una fila | Confirme que Apps Script apunta al ID correcto, tenga permisos de edición y esté desplegado con la versión actual. |
| No llega el PDF por correo | Ejecute `autorizarMailApp`, revise cuota de MailApp y confirme la dirección ingresada. La fila debería seguir guardada. |
| Nota tripartita pendiente | Confirme que las tres respuestas correspondan al mismo estudiante, instancia y semestre, y que cada perspectiva haya alcanzado 16 criterios observados. |
| Estudiante y docente no coinciden | Elija el/la estudiante de la lista; su supervisor(a) docente se determina con la nómina configurada. |

## 8. Privacidad y alcance

El correo se solicita en el formulario y no acredita la identidad de quien responde. El portal es público; no incorpore información confidencial ni datos identificables de terceros. El PDF contiene las calificaciones y respuestas abiertas de la evaluación, por lo que debe enviarse y almacenarse conforme a las prácticas institucionales de resguardo.
