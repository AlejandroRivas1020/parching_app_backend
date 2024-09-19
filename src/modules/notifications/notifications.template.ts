// Plantilla genérica de notificación
export const getNotificationEmailTemplate = (message: string) => `
  <div style="font-family: Arial, sans-serif; font-size: 16px;">
    <h2>Notification</h2>
    <p>${message}</p>
  </div>
`;

// Plantilla para notificación de verificación de correo electrónico
export const getVerificationEmailTemplate = (token: string) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
        <h1>Email Verification</h1>
      </div>
      <div style="padding: 20px; color: #333333;">
        <p style="font-size: 18px;">Hello,</p>
        <p style="font-size: 16px;">Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${token}" 
             style="background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">
            Verify Email
          </a>
        </div>
        <p style="font-size: 14px;">If you did not request this email, you can safely ignore it.</p>
      </div>
      <div style="background-color: #eeeeee; padding: 10px; text-align: center; font-size: 12px; color: #666666;">
        <p>Thank you for choosing OurApp.</p>
      </div>
    </div>
  </div>
`;

// Plantilla para notificación de actualización de evento
export const getEventUpdateTemplate = (eventName: string, message: string) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #2196F3; color: #ffffff; padding: 20px; text-align: center;">
        <h1>Update on ${eventName}</h1>
      </div>
      <div style="padding: 20px; color: #333333;">
        <p style="font-size: 16px;">Dear participant,</p>
        <p style="font-size: 16px;">${message}</p>
        <p style="font-size: 16px;">Thank you for staying updated with this event!</p>
      </div>
      <div style="background-color: #eeeeee; padding: 10px; text-align: center; font-size: 12px; color: #666666;">
        <p>For more details, visit our platform.</p>
      </div>
    </div>
  </div>
`;

// Plantilla para recordatorio de evento
export const getEventReminderTemplate = (eventName: string, date: string) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #FF9800; color: #ffffff; padding: 20px; text-align: center;">
        <h1>Reminder: ${eventName} is Coming Up!</h1>
      </div>
      <div style="padding: 20px; color: #333333;">
        <p style="font-size: 16px;">This is a friendly reminder that the event <strong>${eventName}</strong> will be held on:</p>
        <p style="font-size: 18px; font-weight: bold; text-align: center;">${date}</p>
        <p style="font-size: 16px;">We hope to see you there!</p>
      </div>
      <div style="background-color: #eeeeee; padding: 10px; text-align: center; font-size: 12px; color: #666666;">
        <p>Get ready for an amazing experience!</p>
      </div>
    </div>
  </div>
`;

// Plantilla para notificación de bienvenida
export const getWelcomeEmailTemplate = (userName: string) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
        <h1>Welcome, ${userName}!</h1>
      </div>
      <div style="padding: 20px; color: #333333;">
        <p style="font-size: 16px;">We're excited to have you on board at OurApp. Here, you'll find the best experiences and events tailored just for you.</p>
        <p style="font-size: 16px;">Feel free to explore, and let us know if you need any help getting started.</p>
      </div>
      <div style="background-color: #eeeeee; padding: 10px; text-align: center; font-size: 12px; color: #666666;">
        <p>We're here to assist you in any way possible.</p>
      </div>
    </div>
  </div>
`;
