import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Notifications') // Agrupa los endpoints de notificaciones en Swagger
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Endpoint para enviar una notificación por correo
  @Post('send-email')
  @ApiOperation({ summary: 'Send notification by Email' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        subject: { type: 'string' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Email sent successfully.' })
  @ApiResponse({ status: 500, description: 'Error sending mail.' })
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
  @ApiOperation({ summary: 'Send verification Email' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        userId: { type: 'string' },
        verificationToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Verification email sent.' })
  @ApiResponse({ status: 500, description: 'Error sending mail.' })
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
  @ApiOperation({ summary: 'Send wellcome Email' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        userName: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Welcome email sent.' })
  @ApiResponse({ status: 500, description: 'Error sending Email.' })
  async sendWelcomeEmail(@Body() body: { email: string; userName: string }) {
    return this.notificationsService.sendWelcomeEmail(
      body.email,
      body.userName,
    );
  }

  // Endpoint para obtener todas las notificaciones internas de un usuario
  @Get(':userId')
  @ApiOperation({
    summary: 'Get all notifications of a client',
  })
  @ApiResponse({
    status: 200,
    description: 'Notifications received successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getNotificationsByUser(userId);
  }

  // Endpoint para marcar una notificación como leída
  @Patch(':notificationId/read')
  @ApiOperation({ summary: 'Mark as read a notification' })
  @ApiResponse({ status: 200, description: 'Notification marked as read.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  async markAsRead(@Param('notificationId') notificationId: string) {
    return this.notificationsService.markAsRead(notificationId);
  }
}
