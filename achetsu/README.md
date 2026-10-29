# ACHETSU

Sitio institucional estático para ACHETSU, con una consulta pública del padrón y una aplicación de Google Apps Script para recibir solicitudes de rectificación e incorporación con antecedentes adjuntos. El backend guarda las solicitudes como **pendientes**; solo la revisión administrativa aprobada cambia el padrón.

## Sitio público

`index.html` es la portada de una página con navegación por anclas. `elecciones.html` contiene el detalle del proceso. El padrón tiene una consulta estática de respaldo; `apps-script-config.js` conecta la página al buscador dinámico una vez desplegado Apps Script.

## Preparar el backend de Apps Script

1. Crea un proyecto de Google Apps Script desde la cuenta institucional que administrará los datos. Copia `apps-script/Code.gs`, `Intake.html`, `Directory.html` y `Admin.html` como archivos del proyecto. En **Configuración del proyecto**, habilita la visualización del manifiesto y reemplaza su contenido por `apps-script/appsscript.json`.
2. Ejecuta `initializeBackend()` desde el editor de Apps Script y autoriza los permisos solicitados. Se crearán una hoja de cálculo para `Socios` y `Solicitudes`, además de una carpeta privada de Drive para los antecedentes pendientes. Restringe el acceso a esos archivos a la administración.
3. Configura el acceso administrativo sin escribir la contraseña en el código: en **Configuración del proyecto → Propiedades del script**, agrega `ACHETSU_ADMIN_USER` (por ejemplo `ADMIN`) y `ACHETSU_ADMIN_PASSWORD` con la contraseña. Luego ejecuta `secureAdminPassword()`: guarda un hash con sal y **borra** la propiedad en texto plano. Para cambiar la contraseña, repite este paso.
4. Implementa un único despliegue web: **ejecutar como** la cuenta institucional propietaria y **acceso** para cualquier persona. La misma URL sirve `?view=directory`, `?view=intake` y `?view=admin`. El panel pide usuario y contraseña; cada función administrativa exige un token de sesión temporal (2 horas). Tras 5 intentos fallidos el ingreso se bloquea 15 minutos.
5. En el panel administrativo, guarda la URL `/exec` del despliegue. Luego importa `assets/padron-socios.json` usando el control **Importar padrón**. La importación reemplaza toda la hoja `Socios`; úsala solo para la carga inicial o desde una fuente validada.
6. Copia la misma URL `/exec` en `assets/apps-script-config.js` como valor de `window.ACHETSU_APPS_SCRIPT_URL` y publica de nuevo el sitio estático.

Al publicar cambios en Apps Script, usa **Implementar → Gestionar implementaciones → Editar → Nueva versión**. Antes de anunciar el canal, verifica búsqueda de ambas categorías, rectificación, incorporación, carga y descarga de un adjunto, rechazo y aprobación, y que sin sesión no se puedan listar/revisar solicitudes. Los datos no deben considerarse actualizados hasta que la prueba de aprobación se refleje en la hoja y en la búsqueda pública.

## Verificación y privacidad

El paso TOTP entrega una clave temporal para una app Authenticator y requiere un código de 6 dígitos. No envía SMS y **no verifica la identidad ni la titularidad del teléfono**; el número solo se guarda como contacto de la solicitud. No presentarlo como inicio de sesión o autenticación de identidad. La barrera decisiva es la revisión de antecedentes y la aprobación administrativa.

Los nombres, correos, universidades y estados de habilitación del padrón son visibles para cualquier persona, según el alcance solicitado para la consulta pública. Los teléfonos, archivos adjuntos y notas de revisión se mantienen en el área privada. La habilitación 2026 se conserva en las rectificaciones y solo se modifica al aprobar cuando la administración marca expresamente la confirmación de pago revisado.
