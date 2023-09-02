import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { Login } from "../../usecases/login";

export const makeLogin = () => {
  const userRepository = new UserRepository();
  const usecase = new Login(userRepository);
  return usecase;
};
