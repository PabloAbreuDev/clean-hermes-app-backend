import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { GenerateTelegramUrl } from "../../usecases/generate-telegram-url";

export const makeGenerateTelegramUrl = () => {
  const userRepository = new UserRepository();
  const usecase = new GenerateTelegramUrl(userRepository);
  return usecase;
};
