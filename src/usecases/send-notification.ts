import { SendMailError } from "./errors/send-mail-error";
import { SendTelegramError } from "./errors/send-telegram-error";
import { IEmailService } from "../interfaces/adapters/email-service";
import { INotificationRepository } from "../interfaces/repositories/notification-repository";
import { ITelegramService } from "../interfaces/adapters/telegram-service";
import { IUserRepository } from "../interfaces/repositories/user-repository";
import { UserNotFoundError } from "./errors/user-not-found";

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
	execute(data: SendNotificationDto): Promise<void>;
}

export class SendNotification implements ISendNotification {
	constructor(
		private readonly mailService: IEmailService,
		private readonly telegramService: ITelegramService,
		private readonly notificationRepository: INotificationRepository,
		private readonly userRepository: IUserRepository
	) {}

	async execute(data: SendNotificationDto): Promise<void> {
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
				console.log(err);
				throw new SendMailError();
			}
		}

		if (data.receiverType === "TELEGRAM") {
			try {
				await this.telegramService.send({
					to: user.telegramChatId,
					text: data.receiverTelegramOptions.text,
				});
			} catch (err) {
				console.log(err);
				throw new SendTelegramError();
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
