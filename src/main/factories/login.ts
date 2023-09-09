import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { LoginController } from "../../presentation/controllers/user/login.controller";
import { Controller } from "../../presentation/protocols/http";
import { Login } from "../../usecases/login";

export const makeUserLoginController = (): Controller => {
  const userRepository = new UserRepository();
  const login = new Login(userRepository);
  const loginController = new LoginController(login);
  return loginController;
};
