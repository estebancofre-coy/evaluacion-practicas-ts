# Manual técnico-pedagógico

**Instrumentos de evaluación de Práctica Profesional II**
**Versión:** 2.0 · **Ámbito:** Primer o segundo semestre · Trabajo Social, Universidad de Aysén

## 1. Propósito

El sistema reúne los instrumentos de evaluación del proceso de práctica profesional:
1. **Instrumento tripartito de competencias**: reúne tres perspectivas del proceso formativo (supervisión en terreno, supervisión docente y autoevaluación del estudiante). Su objetivo pedagógico es valorar avances y evidencias del periodo, reconocer el aporte del/de la estudiante al trabajo del centro y acordar desafíos de desarrollo.
2. **Evaluación de Centro de Práctica y Supervisión en Terreno (Paralelo y confidencial)**: instrumento exclusivo para estudiantes que permite valorar de manera directa y autónoma las condiciones institucionales del centro de práctica y el acompañamiento brindado por la supervisión en terreno. *Los supervisores docentes y en terreno no tienen acceso a este formulario ni a sus respuestas.*

## 2. Ponderación de la evaluación tripartita

La evaluación tripartita aporta el **25% de la calificación del semestre**. Dentro de ese componente, cada perspectiva tiene esta ponderación:

| Perspectiva | Peso del componente tripartito |
|---|---:|
| Supervisión en terreno | 40% |
| Supervisión docente | 40% |
| Autoevaluación del/de la estudiante | 20% |

La nota integrada se calcula cuando están registradas las tres perspectivas para el mismo estudiante, instancia y semestre:

`Nota tripartita = 0,4 × nota terreno + 0,4 × nota docente + 0,2 × autoevaluación`

La contribución de este componente a la nota final del curso corresponde a `0,25 × nota tripartita`, según el esquema de ponderación definido en el programa.

## 3. Rúbricas y cálculos

### 3.1 Rúbrica tripartita de resultados de aprendizaje (20 criterios)

Contiene 20 criterios con escala de 1 a 4:

| Nivel | Descriptor |
|---|---|
| 1 · Inicial | Requiere guía permanente; el desempeño todavía no alcanza lo esperado. |
| 2 · En desarrollo | Avance parcial o irregular; requiere orientación frecuente. |
| 3 · Logro esperado | Desempeño consistente para la etapa, con apoyos puntuales. |
| 4 · Destacado | Desempeño autónomo, consistente y fundamentado. |

“**No observado**” se utiliza cuando no hubo una oportunidad suficiente para evaluar el criterio. El puntaje máximo se ajusta al número de criterios puntuados. Se requiere un mínimo de 16 criterios observados para emitir nota.

El porcentaje de logro es `puntaje obtenido / puntaje máximo ajustado`. La conversión establece 4,0 al 70% y 7,0 al 100%, con interpolación lineal, redondeo a un decimal y límite entre 1,0 y 7,0.

### 3.2 Pauta de evaluación de Centros de Práctica y Supervisión en Terreno (14 ítems)

Instrumento paralelo para estudiantes, con escala de 0 a 5 por ítem (donde 0 significa el no cumplimiento y 5 cumplimiento absoluto):

- **Dimensión 1: Centro de Práctica (CP)** (5 ítems, máximo 25 puntos):
  1. Espacio de trabajo apropiado.
  2. Instalaciones facilitadoras.
  3. Buen clima laboral.
  4. Trabajo autónomo y tareas acorde a Trabajo Social.
  5. Consideración de participación y opinión del estudiante.
- **Dimensión 2: Supervisor(a) en Terreno (ST)** (9 ítems, máximo 45 puntos):
  1. Buena comunicación con el ST.
  2. Acompañamiento constante por parte del ST.
  3. Tiempo y buena disposición para favorecer el aprendizaje.
  4. Trato profesional considerando roles y funciones.
  5. Resguardo de actitud ética y Código de Ética Profesional.
  6. Respeto por la autodeterminación de las y los sujetos.
  7. Comunicación asertiva y receptiva.
  8. Real opción de proponer una intervención social.
  9. Consideración de la opinión del estudiante en las decisiones y desarrollo del proceso.
- **Observaciones y comentarios**: cada descriptor cuenta con un campo opcional para comentarios específicos, sumado a un campo amplio para observaciones generales.
- **Escala de calificación**:
  - Puntaje máximo: 70 puntos (14 ítems × 5 puntos).
  - Exigencia de aprobación: 70% (49 puntos equivalen a nota 4,0; 70 puntos a nota 7,0; 0 puntos a nota 1,0).
  - Fórmula:
    - Si $P \ge 49$: $\text{Nota} = 4,0 + 3,0 \times \frac{P - 49}{21}$
    - Si $P < 49$: $\text{Nota} = 1,0 + 3,0 \times \frac{P}{49}$

## 4. Uso por participante

1. Abra el portal: [Evaluación del proceso de práctica](https://estebancofre-coy.github.io/evaluacion-practicas-ts/).
2. **Supervisores (docente o en terreno)**:
   - Ingresan a su rol respectivo.
   - Solo tienen acceso al instrumento tripartito de evaluación del estudiante. No ven ni tienen acceso a la evaluación de centros.
3. **Estudiantes (Autoevaluación)**:
   - Al pulsar “Ingresar como estudiante”, visualizan dos pestañas superiores:
     - **1. Autoevaluación de competencias (RAE · 20%)**: rúbrica en primera persona que integra la nota tripartita.
     - **2. Evaluación del Centro de Práctica (Confidencial)**: pauta confidencial para calificar al centro de práctica y al supervisor en terreno.
   - Los datos comunes ingresados en una pestaña (estudiante, supervisor docente, institución, correo, semestre) se sincronizan de forma automática en la otra.
4. **Descarga de PDF y envío**:
   - En cualquiera de los formularios, el botón **Descargar PDF** abre la vista imprimible limpia con el logo de la Universidad de Aysén para guardarla en el navegador.
   - El botón de envío registra las respuestas en Google Sheets y despacha inmediatamente una copia en PDF al correo electrónico declarado.

## 5. Qué ocurre al enviar

### Evaluación tripartita
Apps Script valida rol, estudiante-supervisor docente, periodo y calificaciones; registra las respuestas en la pestaña principal de la hoja vinculada. Al completar las tres perspectivas compatibles (terreno, docente y estudiante), actualiza la nota tripartita integrada.

### Evaluación del Centro de Práctica
Apps Script verifica que el envío provenga del flujo de estudiantes (`rol: centro_practica`); valida las calificaciones de 0 a 5 en los 14 ítems, calcula puntajes parciales, puntaje total, porcentaje de logro y nota al 70% de exigencia. Registra la fila en una pestaña dedicada denominada **Evaluación Centro de Práctica** (creándola automáticamente si no existe) y despacha al correo ingresado una copia con el informe en PDF adjunto.

## 6. Operación técnica y actualización en Google Apps Script

1. Abra la hoja de respuestas vinculada: https://docs.google.com/spreadsheets/d/1qVxGpBVacPG1R7hPEbKCjVKZKKMg2UlVYBusJ2twHlk/edit.
2. Vaya a **Extensiones > Apps Script**.
3. Reemplace el código en el editor con la versión actualizada de `Code.gs` del repositorio y guarde.
4. Si se solicita autorización de servicios (Sheets y MailApp), ejecute la función `autorizarMailApp` y acepte los permisos.
5. En **Implementar > Gestionar implementaciones**, edite la implementación activa (Web App), seleccione **Nueva versión** y presione **Implementar**. Mantenga la ejecución como su cuenta y el acceso abierto a cualquier usuario.
6. En GitHub, los cambios en `main` se desplegarán automáticamente a GitHub Pages mediante `.github/workflows/deploy-pages.yml`.
