import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { SaveUserChatId } from "../../usecases/save-user-chatid";

export const makeSaveUserChatId = () => {
  const userRepository = new UserRepository();
  const useCase = new SaveUserChatId(userRepository);
  return useCase;
};
