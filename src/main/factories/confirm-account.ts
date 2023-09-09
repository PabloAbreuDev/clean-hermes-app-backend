import { Controller } from "../../controllers/ports/http";
import { ConfirmAccountController } from "../../controllers/user/confirm-account.controller";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { ConfirmAccount } from "../../usecases/confirm-account";

export const makeConfirmAccount = (): Controller => {
  const userRepository = new UserRepository();
  const confirmAccount = new ConfirmAccount(userRepository);
  const confirmAccountController = new ConfirmAccountController(confirmAccount);
  return confirmAccountController;
};
