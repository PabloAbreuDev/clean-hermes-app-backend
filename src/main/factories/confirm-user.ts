import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { ConfirmAccount } from "../../usecases/confirm-account";

export const makeConfirmAccount = () => {
  const userRepository = new UserRepository();
  const useCase = new ConfirmAccount(userRepository);
  return useCase;
};
