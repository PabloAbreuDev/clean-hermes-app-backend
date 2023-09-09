import { User } from "../domain/entities/user";
import {
  ISaveUserChatId,
  SaveUserChatIdDto,
} from "../domain/usecases/save-user-chatid";
import { UserNotFoundError } from "./errors/user-not-found";
import { ILogger } from "./protocols/logger/logger";
import { IUserRepository } from "./protocols/repositories/user-repository";

export class SaveUserChatId implements ISaveUserChatId {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger
  ) {}
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
      this.logger.error({
        description: "Error on save chat id",
        extraInfo: err,
      });
      return;
    }
  }
}
