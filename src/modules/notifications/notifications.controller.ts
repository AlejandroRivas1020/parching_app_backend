import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Endpoint para crear una notificación en la plataforma
  @Post()
  @ApiOperation({ summary: 'Create platform notification' })
  @ApiResponse({
    status: 201,
    description: 'Notificación creada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationsService.createPlatformNotification(
      createNotificationDto,
    );
  }

  // Endpoint para enviar una notificación de actualización de evento
  @Post('send-event-update/:eventId')
  @ApiOperation({ summary: 'Send event update notification' })
  @ApiResponse({
    status: 201,
    description: 'Notificación de actualización de evento enviada.',
  })
  @ApiResponse({ status: 404, description: 'Evento no encontrado.' })
  async sendEventUpdate(
    @Param('eventId') eventId: string,
    @Body('message') message: string,
  ) {
    return this.notificationsService.sendEventUpdateNotification(
      eventId,
      message,
    );
  }

  // Endpoint para enviar un recordatorio de evento un día antes
  @Post('send-event-reminder/:eventId')
  @ApiOperation({ summary: 'Send event reminder notification' })
  @ApiResponse({ status: 201, description: 'Recordatorio enviado.' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado.' })
  async sendEventReminder(@Param('eventId') eventId: string) {
    return this.notificationsService.sendEventReminder(eventId);
  }

  // Obtener todas las notificaciones de un usuario
  @Get(':userId')
  @ApiOperation({
    summary: 'Get all notifications for a user',
  })
  @ApiResponse({
    status: 200,
    description: 'Notificaciones obtenidas correctamente.',
  })
  async getNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getNotificationsByUser(userId);
  }

  // Marcar una notificación como leída
  @Patch(':notificationId/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: 200, description: 'Notificación marcada como leída.' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada.' })
  async markAsRead(@Param('notificationId') notificationId: string) {
    return this.notificationsService.markAsRead(notificationId);
  }

  // Endpoint para enviar un correo de bienvenida
  @Post('send-welcome-email')
  @ApiOperation({ summary: 'Send welcome email' })
  @ApiResponse({ status: 201, description: 'Correo de bienvenida enviado.' })
  @ApiResponse({ status: 500, description: 'Error enviando correo.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        userName: { type: 'string', example: 'John Doe' },
      },
      required: ['email', 'userName'],
    },
  })
  async sendWelcomeEmail(
    @Body('email') email: string,
    @Body('userName') userName: string,
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.notificationsService.sendWelcomeEmail(email, userName);
  }

  // Endpoint para enviar un correo de verificación
  @Post('send-verification-email')
  @ApiOperation({ summary: 'Send verification email' })
  @ApiResponse({ status: 201, description: 'Correo de verificación enviado.' })
  @ApiResponse({ status: 500, description: 'Error enviando correo.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        verificationToken: { type: 'string', example: 'token123456' },
      },
      required: ['email', 'userId', 'verificationToken'],
    },
  })
  async sendVerificationEmail(
    @Body('email') email: string,
    @Body('userId') userId: string,
    @Body('verificationToken') verificationToken: string,
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.notificationsService.sendVerificationEmail(
      email,
      userId,
      verificationToken,
    );
  }
}
