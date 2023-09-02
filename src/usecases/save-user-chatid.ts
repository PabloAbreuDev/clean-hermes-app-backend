import { IUserRepository } from "../interfaces/repositories/user-repository";
import Logger from "../utils/logger";
import { UserNotFoundError } from "./errors/user-not-found";

export interface SaveUserChatIdDto {
  telegramToken: string;
  chatId: number;
}

interface ISaveUserChatId {
  execute(data: SaveUserChatIdDto): Promise<void>;
}

export class SaveUserChatId implements ISaveUserChatId {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(data: SaveUserChatIdDto): Promise<void> {
    const user = await this.userRepository.findByTelegramToken(
      data.telegramToken
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    try {
      await this.userRepository.saveChatId(user._id, data.chatId);
    } catch (err) {
      Logger.error("Error on save chat id");
    }
  }
}
