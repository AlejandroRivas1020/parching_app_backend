// Plantilla genérica de notificación
export const getNotificationEmailTemplate = (message: string) => `
  <div style="font-family: Arial, sans-serif; font-size: 16px;">
    <h2>Notification</h2>
    <p>${message}</p>
  </div>
`;

// Plantilla para notificación de verificación de correo electrónico
export const getVerificationEmailTemplate = (token: string, userId: string) => `
  <div style="font-family: Arial, sans-serif; font-size: 16px;">
    <h2>Email Verification</h2>
    <p>Please verify your email by clicking the link below:</p>
    <a href="https://yourapp.com/verify-email?token=${token}&userId=${userId}">Verify Email</a>
    <p>If you did not request this email, you can safely ignore it.</p>
  </div>
`;

// Plantilla para notificación de actualización de evento
export const getEventUpdateTemplate = (eventName: string, message: string) => `
  <div style="font-family: Arial, sans-serif; font-size: 16px;">
    <h2>Update on ${eventName}</h2>
    <p>${message}</p>
    <p>Thank you for staying updated on this event!</p>
  </div>
`;

// Plantilla para recordatorio de evento
export const getEventReminderTemplate = (eventName: string, date: string) => `
  <div style="font-family: Arial, sans-serif; font-size: 16px;">
    <h2>Reminder: ${eventName} is Coming Up!</h2>
    <p>This is a friendly reminder that the event <strong>${eventName}</strong> will be held on ${date}.</p>
    <p>We hope to see you there!</p>
  </div>
`;

// Plantilla para notificación de bienvenida
export const getWelcomeEmailTemplate = (userName: string) => `
  <div style="font-family: Arial, sans-serif; font-size: 16px;">
    <h2>Welcome, ${userName}!</h2>
    <p>Thank you for joining our platform. We’re excited to have you with us!</p>
  </div>
`;
