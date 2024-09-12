import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import {
  getNotificationEmailTemplate,
  getVerificationEmailTemplate,
  getEventUpdateTemplate,
  getEventReminderTemplate,
  getWelcomeEmailTemplate,
} from './notifications.template';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../user/entities/user.entity';
import { InjectQueue, Process } from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectQueue('notification') private notificationQueue: Queue,
  ) {
    // Configuración de Nodemailer
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // SSL/TLS
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  // Enviar correo electrónico usando plantillas
  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM'),
      to,
      subject,
      html: htmlContent, // Aquí la plantilla HTML
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      throw new Error('Failed to send email');
    }
  }

  // Enviar un correo con la plantilla genérica
  async sendGenericNotification(
    to: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const htmlContent = getNotificationEmailTemplate(message);
    await this.sendEmail(to, subject, htmlContent);
  }

  // Enviar un correo de bienvenida
  async sendWelcomeEmail(to: string, userName: string): Promise<void> {
    const subject = 'Welcome to Our Platform!';
    const htmlContent = getWelcomeEmailTemplate(userName); //plantilla
    await this.sendEmail(to, subject, htmlContent);
  }

  // enviar un correo de verificación
  async sendVerificationEmail(
    to: string,
    userId: string,
    token: string,
  ): Promise<void> {
    const subject = 'Verify Your Email Address';
    const htmlContent = getVerificationEmailTemplate(token, userId); //plantilla
    await this.sendEmail(to, subject, htmlContent);
  }

  // Enviar una notificación de actualización de evento
  async sendEventUpdateNotification(
    to: string,
    eventName: string,
    message: string,
  ): Promise<void> {
    const subject = `Update on ${eventName}`;
    const htmlContent = getEventUpdateTemplate(eventName, message); //plantilla
    await this.sendEmail(to, subject, htmlContent);
  }

  // enviar un recordatorio de evento
  async sendEventReminderNotification(
    to: string,
    eventName: string,
    date: string,
  ): Promise<void> {
    const subject = `Reminder: ${eventName} is coming up`;
    const htmlContent = getEventReminderTemplate(eventName, date); //plantilla
    await this.sendEmail(to, subject, htmlContent);
  }

  // Anade correo electrónico a la cola
  async queueEmailNotification(to: string, subject: string, message: string) {
    await this.notificationQueue.add('send-email', { to, subject, message });
  }

  // Procesa tareas en la cola
  @Process('send-email')
  async handleSendEmail(job: Job) {
    const { to, subject, message } = job.data;
    await this.sendEmail(to, subject, message);
  }

  // creando notificacion interna
  async createPlatformNotification(
    user: User,
    title: string,
    message: string,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      user,
      title,
      message,
      isRead: false,
    });
    return this.notificationRepository.save(notification);
  }

  // Obtener las notificaciones internas de un usuario
  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
  }

  // Marcar notificacion leída
  async markAsRead(notificationId: string): Promise<void> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });
    if (notification) {
      notification.isRead = true;
      await this.notificationRepository.save(notification);
    } else {
      throw new Error('Notification not found');
    }
  }
}
