import { SendMailError } from "./errors/send-mail-error";
import { SendTelegramError } from "./errors/send-telegram-error";
import { IEmailService } from "./ports/adapters/email-service";
import { ITelegramService } from "./ports/adapters/telegram-service";
import { UserNotFoundError } from "./errors/user-not-found";
import { INotificationRepository } from "./ports/repositories/notification-repository";
import { IUserRepository } from "./ports/repositories/user-repository";
import { Notification } from "../entities/notification";
import Logger from "../utils/logger";

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
		text: string;
	};
}

interface ISendNotification {
	execute(data: SendNotificationDto): Promise<Notification | null | undefined>;
}

export class SendNotification implements ISendNotification {
	constructor(
		private readonly mailService: IEmailService,
		private readonly telegramService: ITelegramService,
		private readonly notificationRepository: INotificationRepository,
		private readonly userRepository: IUserRepository
	) {}

	async execute(
		data: SendNotificationDto
	): Promise<Notification | null | undefined> {
		const user = await this.userRepository.findById(data.userId);

		if (!user) {
			throw new UserNotFoundError();
		}

		if (data.receiverType === "EMAIL") {
			try {
				await this.mailService.send({
					to: data.receiverEmailOptions.address,
					subject: data.receiverEmailOptions.subject,
					text: data.receiverEmailOptions.text,
				});
			} catch (err) {
				Logger.error(err);
				throw new SendMailError();
			}
		}

		if (data.receiverType === "TELEGRAM") {
			try {
				await this.telegramService.send({
					text: data.receiverTelegramOptions.text,
				});
			} catch (err) {
				Logger.error(err);
				throw new SendTelegramError();
			}
		}

		try {
			return await this.notificationRepository.create(data.notification);
		} catch (err) {
			Logger.error(err);
			return;
		}
	}
}
