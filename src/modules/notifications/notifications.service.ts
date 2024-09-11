import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { getNotificationEmailTemplate } from './notifications.template'; // Importa la plantilla

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM'),
      to,
      subject,
      text,
      html: getNotificationEmailTemplate(text), // Usa la plantilla importada
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      throw new Error('Failed to send email');
    }
  }
}
