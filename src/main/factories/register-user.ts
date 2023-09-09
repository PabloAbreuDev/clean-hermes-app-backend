import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { NodeMailerMailService } from "../../infra/messageria/mail/email-service";
import { RegisterUserController } from "../../presentation/controllers/user/register-user.controller";
import { Controller } from "../../presentation/protocols/http";
import { RegisterUser } from "../../usecases/register-user";

export const makeRegisterUserController = (): Controller => {
  const userRepository = new UserRepository();
  const mailService = new NodeMailerMailService();
  const registerUser = new RegisterUser(userRepository, mailService);
  const registerUserController = new RegisterUserController(registerUser);
  return registerUserController;
};
