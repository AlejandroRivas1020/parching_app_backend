import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

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
}
