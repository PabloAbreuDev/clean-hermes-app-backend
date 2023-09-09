import config from "config";
import { JwtAdapter } from "../../infra/cryptography/jwt-adapter";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { LoginController } from "../../presentation/controllers/user/login.controller";
import { Controller } from "../../presentation/protocols/http";
import { Login } from "../../usecases/login";
import { BCryptAdapter } from "../../infra/cryptography/bcrypt-adapter";

export const makeUserLoginController = (): Controller => {
  const userRepository = new UserRepository();
  const encrypter = new JwtAdapter(config.get("jwt.secret"));
  const hashComparer = new BCryptAdapter(10);
  const login = new Login(userRepository, encrypter, hashComparer);
  const loginController = new LoginController(login);
  return loginController;
};
