import {
  ITelegramService,
  TelegramOptions,
} from "../../../interfaces/adapters/telegram-service";

export class TelegramService implements ITelegramService {
  async send(options: TelegramOptions) {
    return await options;
  }
}
