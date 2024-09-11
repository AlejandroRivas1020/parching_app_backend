export const getNotificationEmailTemplate = (message: string) => `
  <div style= "font-family: Arial, sans-serif; font-size: 16px;">
    <h2>Notification</h2>
    <p>${message}</p>
  </div>
`;
