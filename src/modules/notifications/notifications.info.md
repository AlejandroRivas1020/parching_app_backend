# Listado de Endpoints

1. **Enviar un correo con una notificacion generica**
   **Descripcion**: Envia un correo electronico utilizando la plantilla generica con un mensaje personalizado.
   **URL**: `POST /notifications/send-generic-notification`

   **Body**:

   ```json
   {
     "email": "user@example.com",
     "subject": "aqui el asunto",
     "message": "esto es un mensaje de ejemplo."
   }
   ```

2. **Enviar un correo de verificacion de cuenta**
   **Descripcion**: Envia un correo de verificacion al usuario con un enlace para verificar su cuenta.
   **URL**: `POST /notifications/send-verification-email`

   **Body**:

   ```json
   {
     "email": "user@example.com",
     "userId": "userid-uuid",
     "verificationToken": "token-12345"
   }
   ```

3. **Enviar un correo de bienvenida**
   **Descripcion**: Envia un correo de bienvenida al usuario tras registrarse.
   **URL**: `POST /notifications/send-welcome-email`

   **Body**:

   ```json
   {
     "email": "user@example.com",
     "userName": "John Doe"
   }
   ```

4. **Enviar un correo de actualizacion de evento**
   **Descripcion**: Envia un correo informando al usuario sobre un cambio relacionado con algun evento al que esta inscrito.
   **URL**: `POST /notifications/send-event-update`

   **Body**:

   ```json
   {
     "email": "user@example.com",
     "eventName": "Nombre del evento",
     "message": "El evento ha cambiado, aqui estan los detalles... blablabla"
   }
   ```

5. **Enviar un correo de recordatorio de evento**
   **Descripcion**: Envia un correo de recordatorio al usuario sobre un evento que en el que esta inscrito y viene pronto.
   **URL**: `POST /notifications/send-event-reminder`

   **Body**:

   ```json
   {
     "email": "user@example.com",
     "eventName": "Nombre del evento",
     "date": "2024-10-14"
   }
   ```

6. **Obtener las notificaciones internas de un usuario**
   **Descripcion**: Carga todas las notificaciones internas (dentro de la plataforma) de un usuario.
   **URL**: `GET /notifications/:userId`

   **Parametros**:
   - `userId`: UUID del usuario (en la URL).

7. **Marcar una notificacion como leida**
   **Descripcion**: Marca una notificacion especifica como leida.
   **URL**: `PATCH /notifications/:notificationId/read`

   **Parametros**:
   - `notificationId`: UUID de la notificacion (en la URL).

## Resumen de los Endpoints

| Metodo | URL | Descripcion |
|--------|-----|-------------|
| `POST` | `/notifications/send-generic-notification` | Enviar correo con notificacion generica |
| `POST` | `/notifications/send-verification-email` | Enviar correo de verificacion de cuenta |
| `POST` | `/notifications/send-welcome-email` | Enviar correo de bienvenida |
| `POST` | `/notifications/send-event-update` | Enviar correo de actualizacion de evento |
| `POST` | `/notifications/send-event-reminder` | Enviar correo de recordatorio de evento |
| `GET`  | `/notifications/:userId` | Obtener todas las notificaciones internas de un usuario |
| `PATCH`| `/notifications/:notificationId/read` | Marcar una notificacion como leida |

### Ejemplos de Llamadas API

- **GET**: Para obtener notificaciones internas de un usuario:
  - `GET /notifications/123e4567-e89b-12d3-a456-426614174000`

- **PATCH**: Para marcar una notificacion como leida:
  - `PATCH /notifications/456e4567-e89b-12d3-a456-426614174000/read`
