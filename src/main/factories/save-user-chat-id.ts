import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { LoggerWithPino } from "../../infra/logger/logger-adapter";
import { SaveUserChatId } from "../../usecases/save-user-chatid";

export const makeSaveUserChatId = () => {
  const userRepository = new UserRepository();
  const logger = new LoggerWithPino();
  const saveUserChatId = new SaveUserChatId(userRepository, logger);
  return saveUserChatId;
};
