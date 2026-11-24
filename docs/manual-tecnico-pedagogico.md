# Manual técnico-pedagógico

**Instrumentos de evaluación de Práctica Profesional II**
**Versión:** 2.1 · **Ámbito:** Primer o segundo semestre · Trabajo Social, Universidad de Aysén

## 1. Propósito

El sistema reúne los instrumentos de evaluación del proceso de práctica profesional:
1. **Instrumento tripartito de competencias**: reúne tres perspectivas del proceso formativo (supervisión en terreno, supervisión docente y autoevaluación del estudiante). Su objetivo pedagógico es valorar avances y evidencias del periodo, reconocer el aporte del/de la estudiante al trabajo del centro y acordar desafíos de desarrollo.
2. **Evaluación de Centro de Práctica y Supervisión en Terreno (Paralelo y confidencial)**: instrumento exclusivo para estudiantes que permite valorar de manera directa y autónoma las condiciones institucionales del centro de práctica y el acompañamiento brindado por la supervisión en terreno. *Los supervisores docentes y en terreno no tienen acceso a este formulario ni a sus respuestas.*

## 2. Identificación unificada

Para evitar solicitar doble información al estudiante, el sistema cuenta con un **panel único de identificación inicial**:
- Instancia de evaluación y semestre (con año correspondiente).
- Correo electrónico para recepción de copias y devoluciones en PDF.
- Estudiante y asignación automática del/de la supervisor(a) docente.
- Centro de práctica (Institución) y programa institucional o área.
- Nombre del/de la supervisor(a) en terreno.

## 3. Ponderación y obligatoriedad

### Evaluación tripartita (25% de la calificación semestral)
- Supervisión en terreno: 40%
- Supervisión docente: 40%
- Autoevaluación del/de la estudiante: 20%
- `Nota tripartita = 0,4 × nota terreno + 0,4 × nota docente + 0,2 × autoevaluación`

### Obligatoriedad conjunta para estudiantes
El/la estudiante no puede enviar respuestas parciales:
- **Debe calificar obligatoriamente ambos instrumentos** (Pestaña 1: Autoevaluación de competencias y Pestaña 2: Evaluación del Centro de Práctica).
- Si falta responder algún criterio en cualquiera de las dos pestañas, el sistema bloquea el envío y no registra respuesta en la base de datos.
- Una vez completados ambos, se procesa el registro simultáneo y se despacha la devolución por correo electrónico.

## 4. Rúbricas y cálculos

### 4.1 Rúbrica tripartita de resultados de aprendizaje (20 criterios)
Contiene 20 criterios con escala de 1 a 4 y opción "No observado". El porcentaje de logro es `puntaje obtenido / puntaje máximo ajustado`. La nota se calcula entre 4,0 al 70% y 7,0 al 100%, con redondeo a un decimal (se requiere un mínimo de 16 criterios observados).

### 4.2 Pauta de evaluación de Centro de Práctica (14 ítems)
- **Dimensión 1: Centro de Práctica (CP)**: 5 descriptores evaluados de 0 a 5 (máximo 25 puntos).
- **Dimensión 2: Supervisor(a) en Terreno (ST)**: 9 descriptores evaluados de 0 a 5 (máximo 45 puntos).
- Cada descriptor cuenta con campo para comentarios opcionales, más un área de observaciones generales.
- **Escala de calificación**: Puntaje máximo de 70 puntos con exigencia del 70% (49 puntos = nota 4,0; 70 puntos = nota 7,0; 0 puntos = nota 1,0).

## 5. Devolución y reportes PDF

- **En la web**: Los estudiantes disponen de botones independientes para previsualizar e imprimir ambos documentos por separado (`Descargar PDF Autoevaluación` y `Descargar PDF Centro de Práctica`).
- **Por correo electrónico**: Al enviar exitosamente, el correo de devolución entrega al estudiante **ambos instrumentos por separado en dos archivos PDF adjuntos**:
  1. `1-Autoevaluacion-[Estudiante].pdf`: Informe completo de competencias formativas y acuerdos.
  2. `2-Evaluacion-Centro-Practica-[Estudiante].pdf`: Informe confidencial del centro de práctica y supervisión en terreno con sus comentarios respectivos.

## 6. Panel Maestro (Dashboard Consolidado en Google Sheets)

Para facilitar el seguimiento docente y de coordinación con una presentación visual moderna y limpia, el sistema genera y actualiza automáticamente la pestaña **`Panel Maestro`** con diseño ejecutivo de dashboard:

1. **Tarjetas KPI Superiores (Fila 2)**:
   - `👥 TOTAL NÓMINA`: 20 estudiantes.
   - `🏢 EVAL. CENTRO`: Total y porcentaje de entregas recibidas (`X / 20 · X%`).
   - `⚖️ TRIPARTITAS`: Total y porcentaje de evaluaciones completadas con sus 3 miradas.
   - `📈 PROMEDIO FINAL`: Promedio acumulado de notas integradas sobre escala 7,0.
2. **Tabla de Calificaciones Ponderadas (Fila 4 en adelante)**:
   - `Nota Terreno (40%)` y `Aporte Terreno` (en gris secundario para no competir visualmente).
   - `Nota Docente (40%)` y `Aporte Docente`.
   - `Nota Autoeval. (20%)` y `Aporte Autoeval.`.
   - **`Nota Tripartita Final`**: Destacada en un pilar color esmeralda suave (`#ecfdf5`), negrita 11pt.
   - `Estado Tripartito`: Píldora de estado (`Completa` o `Pendiente: [Faltantes]`).
3. **Check de Evaluación del Centro de Práctica**: Columna interactiva con **casilla de verificación nativa** (`insertCheckboxes`) que marca ✔ `TRUE` si el/la estudiante completó su evaluación del centro, junto con su `Nota Centro Práctica`.
4. **Estética y ergonomía visual**:
   - Altura de filas de 28px con alineación vertical centrada (`middle`) y tipografía limpia.
   - Alternancia de filas (Zebra striping suave en `#ffffff` y `#f8faf8`) y bordes gris pizarra tenues (`#e2e8f0`).
   - Reglas de formato condicional automáticas con colores pastel para estados (`Al día`, `En proceso`, `Sin iniciar`).
   - Paneles congelados en Fila 4 y Columna 1.
5. **Menú contextual en Google Sheets**:
   - **`Evaluaciones de Práctica > 📊 Actualizar Panel Maestro`**: regenera o refresca la pestaña con la nueva estética.
   - **`Evaluaciones de Práctica > 🌐 Abrir Dashboard Interactivo`**: despliega una ventana modal interactiva dentro de Google Sheets con buscador de estudiantes en tiempo real, filtros y tarjetas KPI.

## 7. Operación técnica y actualización en Google Apps Script

1. Abra la hoja de respuestas vinculada: https://docs.google.com/spreadsheets/d/1qVxGpBVacPG1R7hPEbKCjVKZKKMg2UlVYBusJ2twHlk/edit.
2. Vaya a **Extensiones > Apps Script**.
3. Reemplace el código en el editor con la versión actualizada de `Code.gs` del repositorio y guarde (<kbd>Ctrl</kbd> + <kbd>S</kbd>).
4. En **Implementar > Gestionar implementaciones**, edite la implementación activa (Web App), seleccione **Versión: Nueva versión** y presione **Implementar**.
5. Los cambios en GitHub (`main`) se publican de forma automática a GitHub Pages: https://estebancofre-coy.github.io/evaluacion-practicas-ts/.
