import config from "config";
import {
	ITelegramService,
	TelegramOptions,
} from "../../../interfaces/adapters/telegram-service";
import axios from "axios";

export class TelegramService implements ITelegramService {
	async send(options: TelegramOptions) {
		await axios.post(
			`https://api.telegram.org/bot${config.get(
				"telegram.botToken"
			)}/sendMessage?chat_id=${options.to}&text=${options.text}`
		);
		return options;
	}
}
