import { Controller } from "../../controllers/ports/http";
import { GenerateTelegramURLController } from "../../controllers/user/generate-telegram-url.controller";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { GenerateTelegramUrl } from "../../usecases/generate-telegram-url";

export const makeGenerateTelegramUrl = (): Controller => {
  const userRepository = new UserRepository();
  const generateTelegramUrl = new GenerateTelegramUrl(userRepository);
  const generateTelegramUrlController = new GenerateTelegramURLController(
    generateTelegramUrl
  );
  return generateTelegramUrlController;
};
