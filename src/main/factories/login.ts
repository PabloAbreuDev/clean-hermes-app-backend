import { Controller } from "../../controllers/ports/http";
import { LoginController } from "../../controllers/user/login.controller";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { Login } from "../../usecases/login";

export const makeUserLoginController = (): Controller => {
  const userRepository = new UserRepository();
  const login = new Login(userRepository);
  const loginController = new LoginController(login);
  return loginController;
};
