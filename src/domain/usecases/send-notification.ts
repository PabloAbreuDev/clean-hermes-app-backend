import { Notification } from "../entities/notification";

export interface SendNotificationDto {
  notification: {
    name: string;
    description: string;
    additionalInfo: any;
  };
  receiverType: "EMAIL" | "TELEGRAM";
  userId: string;
  receiverEmailOptions: {
    address: string;
    subject: string;
    text: string;
  };
  receiverTelegramOptions: {
    to: number;
    text: string;
  };
}

export interface ISendNotification {
  execute(data: SendNotificationDto): Promise<Notification | null | undefined>;
}
