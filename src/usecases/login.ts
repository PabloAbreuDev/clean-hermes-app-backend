import { EmailOrPasswordInvalidError } from "./errors/email-or-pass-invalid";
import { UserNotFoundError } from "./errors/user-not-found";
import { ILogin, LoginDto } from "../domain/usecases/login";
import { IUserRepository } from "./protocols/repositories/user-repository";
import { Encrypter } from "./protocols/crypto/encrypter";
import { HashComparer } from "./protocols/crypto/hash-comparer";

export class Login implements ILogin {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer
  ) {}
  async execute(data: LoginDto): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const validPass = await this.hashComparer.compare(
      data.password,
      user.password
    );

    if (!validPass) {
      throw new EmailOrPasswordInvalidError();
    }

    return this.encrypter.encrypt(user.id);
  }
}
