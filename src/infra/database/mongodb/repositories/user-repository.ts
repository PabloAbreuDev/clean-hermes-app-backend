import { User } from "../../../../entities/user";
import { IUserRepository } from "../../../../usecases/ports/repositories/user-repository";
import UserModel from "../models/user";

export class UserRepository implements IUserRepository {
  async create(data: Partial<User>): Promise<User | null> {
    return await UserModel.create(data);
  }
  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }
  async findByVerifyCode(verifyCode: string): Promise<User | null> {
    return await UserModel.findOne({ verifyCode });
  }
  async confirmAccount(id: string): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(
      { _id: id },
      { verified: true, verifyCode: "" },
      { new: true }
    );
  }
  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findByTelegramToken(telegramToken: string): Promise<User | null> {
    return await UserModel.findOne({ telegramToken });
  }

  async saveChatId(id: string, chatId: number): Promise<User | null> {
    return await UserModel.findOneAndUpdate(
      { _id: id },
      { telegramChatId: chatId }
    );
  }
}
