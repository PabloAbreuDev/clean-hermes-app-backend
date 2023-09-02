import { SendMailError } from "./errors/send-mail-error";
import { SendTelegramError } from "./errors/send-telegram-error";
import { IEmailService } from "../interfaces/adapters/email-service";
import { INotificationRepository } from "../interfaces/repositories/notification-repository";
import { ITelegramService } from "../interfaces/adapters/telegram-service";
import { IWhatsappService } from "../interfaces/adapters/whatsapp-service";
import { SendWhatsappError } from "./errors/send-whatsapp-error";

export interface SendNotificationDto {
  notification: {
    name: string;
    description: string;
    additionalInfo: any;
  };
  receiverType: "EMAIL" | "WHATSAPP" | "TELEGRAM";
  receiverEmailOptions: {
    address: string;
    subject: string;
    text: string;
    html: string;
    attachments: any[];
  };
  receiverPhoneOptions: {
    phoneNumber: string;
    text: string;
  };
}

interface ISendNotification {
  execute(data: SendNotificationDto): Promise<void>;
}

export class SendNotification implements ISendNotification {
  constructor(
    private readonly mailService: IEmailService,
    private readonly telegramService: ITelegramService,
    private readonly notificationRepository: INotificationRepository,
    private readonly whatsappServce: IWhatsappService
  ) {}

  async execute(data: SendNotificationDto): Promise<void> {
    if (data.receiverType === "EMAIL") {
      try {
        await this.mailService.send({
          to: data.receiverEmailOptions.address,
          subject: data.receiverEmailOptions.subject,
          text: data.receiverEmailOptions.text,
          html: data.receiverEmailOptions.html,
          attachments: data.receiverEmailOptions.attachments,
        });
      } catch (err) {
        console.log(err);
        throw new SendMailError();
      }
    }

    if (data.receiverType === "TELEGRAM") {
      try {
        await this.telegramService.send({
          to: data.receiverPhoneOptions.phoneNumber,
          text: data.receiverPhoneOptions.text,
        });
      } catch (err) {
        console.log(err);
        throw new SendTelegramError();
      }
    }

    if (data.receiverType === "WHATSAPP") {
      try {
        await this.whatsappServce.send({
          text: data.receiverPhoneOptions.text,
          to: data.receiverPhoneOptions.phoneNumber,
        });
      } catch (err) {
        console.log(err);
        new SendWhatsappError();
      }
    }

    try {
      await this.notificationRepository.create(data.notification);
    } catch (err) {
      console.log(err);
    }

    return;
  }
}
