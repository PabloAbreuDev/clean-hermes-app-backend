import { User } from "../entities/user";
import { ConfirmUserError } from "./errors/confirm-user-error";
import { UserNotFoundError } from "./errors/user-not-found";
import { IUserRepository } from "./ports/repositories/user-repository";

export interface ConfirmAccountDto {
  verifyCode: string;
}

interface IConfirmAccount {
  execute(data: ConfirmAccountDto): Promise<User | null | undefined>;
}

export class ConfirmAccount implements IConfirmAccount {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(data: ConfirmAccountDto): Promise<User | null | undefined> {
    const user = await this.userRepository.findByVerifyCode(data.verifyCode);
    if (!user) {
      throw new UserNotFoundError();
    }

    try {
      const verifiedUser = await this.userRepository.confirmAccount(user.id);
      return verifiedUser;
    } catch (err) {
      throw new ConfirmUserError();
    }
  }
}
