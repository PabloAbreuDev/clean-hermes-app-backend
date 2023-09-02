import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { NodeMailerMailService } from "../../infra/messageria/mail/email-service";
import { RegisterUser } from "../../usecases/register-user";

export const makeRegisterUser = () => {
  const userRepository = new UserRepository();
  const mailService = new NodeMailerMailService();
  const useCase = new RegisterUser(userRepository, mailService);
  return useCase;
};
