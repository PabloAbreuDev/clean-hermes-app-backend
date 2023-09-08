import { IUser, User } from "../../../entities/user";
import { IBaseRepository, WithId } from "./index.ts";

export interface IUserRepository extends IBaseRepository<User> {
  findByTelegramToken(telegramToken: string): Promise<WithId<User> | null>;
  findByVerifyCode(verifyCode: string): Promise<WithId<User> | null>;
  findByEmail(email: string): Promise<WithId<User> | null>;
  confirmAccount(id: string): Promise<WithId<User> | null>;
  saveChatId(id: string, chatId: number): Promise<WithId<User> | null>;
}
