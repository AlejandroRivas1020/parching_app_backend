import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Endpoint para enviar una notificación por correo
  @Post('send-email')
  async sendEmailNotification(
    @Body() body: { email: string; subject: string; message: string },
  ) {
    return this.notificationsService.sendEmail(
      body.email,
      body.subject,
      body.message,
    );
  }

  // Endpoint para enviar un correo de verificación
  @Post('send-verification-email')
  async sendVerificationEmail(
    @Body() body: { email: string; userId: string; verificationToken: string },
  ) {
    return this.notificationsService.sendVerificationEmail(
      body.email,
      body.userId,
      body.verificationToken,
    );
  }

  // Endpoint para enviar un correo de bienvenida
  @Post('send-welcome-email')
  async sendWelcomeEmail(@Body() body: { email: string; userName: string }) {
    return this.notificationsService.sendWelcomeEmail(
      body.email,
      body.userName,
    );
  }

  // Endpoint para obtener todas las notificaciones internas de un usuario
  @Get(':userId')
  async getNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getNotificationsByUser(userId);
  }

  // Endpoint para marcar una notificación como leída
  @Patch(':notificationId/read')
  async markAsRead(@Param('notificationId') notificationId: string) {
    return this.notificationsService.markAsRead(notificationId);
  }
}
