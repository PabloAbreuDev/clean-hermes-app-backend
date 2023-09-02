import config from "config";
import { IUserRepository } from "../interfaces/repositories/user-repository";
import { UserNotFoundError } from "./errors/user-not-found";

export interface GenerateTelegramUrlDto {
  id: string;
}

interface IGenerateTelegramUrl {
  execute(data: GenerateTelegramUrlDto): Promise<string>;
}

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
