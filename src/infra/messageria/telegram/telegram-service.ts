import config from "config";
import axios from "axios";
import {
  ITelegramService,
  TelegramOptions,
} from "../../../usecases/protocols/messageria/telegram-service";

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
