import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { ConfirmAccountController } from "../../presentation/controllers/user/confirm-account.controller";
import { Controller } from "../../presentation/protocols/http";
import { ConfirmAccount } from "../../usecases/confirm-account";

export const makeConfirmAccount = (): Controller => {
  const userRepository = new UserRepository();
  const confirmAccount = new ConfirmAccount(userRepository);
  const confirmAccountController = new ConfirmAccountController(confirmAccount);
  return confirmAccountController;
};
