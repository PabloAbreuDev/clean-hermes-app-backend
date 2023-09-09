import { User } from "../domain/entities/user";
import {
  ISaveUserChatId,
  SaveUserChatIdDto,
} from "../domain/usecases/save-user-chatid";
import Logger from "../utils/logger";
import { UserNotFoundError } from "./errors/user-not-found";
import { IUserRepository } from "./ports/repositories/user-repository";

export class SaveUserChatId implements ISaveUserChatId {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(data: SaveUserChatIdDto): Promise<User | null | undefined> {
    const user = await this.userRepository.findByTelegramToken(
      data.telegramToken
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    try {
      return await this.userRepository.saveChatId(user.id, data.chatId);
    } catch (err) {
      Logger.error("Error on save chat id");
      return;
    }
  }
}
