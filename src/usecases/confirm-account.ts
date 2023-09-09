import { User } from "../domain/entities/user";
import {
  IConfirmAccount,
  ConfirmAccountDto,
} from "../domain/usecases/confirm-account";
import { ConfirmUserError } from "./errors/confirm-user-error";
import { UserNotFoundError } from "./errors/user-not-found";
import { IUserRepository } from "./protocols/repositories/user-repository";

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
