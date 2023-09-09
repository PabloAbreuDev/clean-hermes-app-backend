import config from "config";
import { UserNotFoundError } from "./errors/user-not-found";
import { IUserRepository } from "./ports/repositories/user-repository";
import {
  IGenerateTelegramUrl,
  GenerateTelegramUrlDto,
} from "../domain/usecases/generate-telegram-url";

export class GenerateTelegramUrl implements IGenerateTelegramUrl {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(data: GenerateTelegramUrlDto): Promise<string> {
    const user = await this.userRepository.findById(data.id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return `https://www.telegram.me/${config.get("telegram.botName")}?start=${
      user.telegramToken
    }`;
  }
}
