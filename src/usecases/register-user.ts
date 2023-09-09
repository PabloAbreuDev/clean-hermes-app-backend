import { User } from "../domain/entities/user";
import { RegisterUserError } from "./errors/register-user-error";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { confirmAccountTemplate } from "./templates/email/confirm-account";
import {
  IRegisterUser,
  RegisterUserDto,
} from "../domain/usecases/register-user";
import { IEmailService } from "./protocols/messageria/email-service";
import { IUserRepository } from "./protocols/repositories/user-repository";
import { ILogger } from "./protocols/logger/logger";
import { Hasher } from "./protocols/crypto/hasher";

export class RegisterUser implements IRegisterUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IEmailService,
    private readonly logger: ILogger,
    private readonly hashser: Hasher
  ) {}
  async execute(data: RegisterUserDto): Promise<User | null> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    try {
      const newUser = new User({
        name: data.name,
        email: data.email,
        password: await this.hashser.hash(data.password),
      });

      const user = await this.userRepository.create(newUser);

      this.mailService.send({
        to: data.email,
        subject: "Welcome to hermes app",
        text: confirmAccountTemplate(newUser.verifyCode),
        html: confirmAccountTemplate(newUser.verifyCode),
        attachments: [],
      });
      return user;
    } catch (err) {
      this.logger.error({ extraInfo: err });
      throw new RegisterUserError();
    }
  }
}
