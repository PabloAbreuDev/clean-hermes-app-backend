import config from "config";
import { BCryptAdapter } from "../../infra/cryptography/bcrypt-adapter";
import { JwtAdapter } from "../../infra/cryptography/jwt-adapter";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { NodeMailerMailService } from "../../infra/messageria/mail/email-service";
import { RegisterUserController } from "../../presentation/controllers/user/register-user.controller";
import { Controller } from "../../presentation/protocols/http";
import { RegisterUser } from "../../usecases/register-user";
import { LoggerWithPino } from "../../infra/logger/logger-adapter";

export const makeRegisterUserController = (): Controller => {
  const userRepository = new UserRepository();
  const mailService = new NodeMailerMailService();
  const hashComparer = new BCryptAdapter(10);
  const logger = new LoggerWithPino();
  const registerUser = new RegisterUser(
    userRepository,
    mailService,
    logger,
    hashComparer
  );
  const registerUserController = new RegisterUserController(registerUser);
  return registerUserController;
};
