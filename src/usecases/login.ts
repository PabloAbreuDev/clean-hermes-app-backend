import config from "config";
import { comparePasswords } from "../utils/bcrypt";
import { generateTokens } from "../utils/jwt";
import { EmailOrPasswordInvalidError } from "./errors/email-or-pass-invalid";
import { UserNotFoundError } from "./errors/user-not-found";
import { IUserRepository } from "./ports/repositories/user-repository";

export interface LoginDto {
  email: string;
  password: string;
}

export interface ILogin {
  execute(
    data: LoginDto
  ): Promise<{ accessToken: string; refreshToken: string }>;
}

export class Login implements ILogin {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(
    data: LoginDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const validPass = await comparePasswords(data.password, user.password);
    if (!validPass) {
      throw new EmailOrPasswordInvalidError();
    }

    return generateTokens(
      { _id: user.id, email: user.email },
      config.get("jwt.secret"),
      config.get("jwt.tokenExpiresIn"),
      config.get("jwt.refreshTokenExpiresIn")
    );
  }
}
