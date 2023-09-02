import { makeConfirmAccount } from "../main/factories/confirm-user";
import { makeGenerateTelegramUrl } from "../main/factories/generate-telegram-url";
import { makeLogin } from "../main/factories/login";
import { makeRegisterUser } from "../main/factories/register-user";
import { ConfirmAccountDto } from "../usecases/confirm-account";
import { GenerateTelegramUrlDto } from "../usecases/generate-telegram-url";
import { LoginDto } from "../usecases/login";
import { RegisterUserDto } from "../usecases/register-user";
import { Request, Response } from "./ports/http";

export class UserController {
  async registerUser(req: Request<RegisterUserDto>, res: Response) {
    try {
      const useCase = makeRegisterUser();
      const result = await useCase.execute(req.body);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(500).json(err);
    }
  }

  async confirmAccount(req: Request<ConfirmAccountDto>, res: Response) {
    try {
      const { verifyCode } = req.params;

      if (typeof verifyCode !== "string") {
        throw new Error("verifyCode deve ser uma string.");
      }

      const useCase = makeConfirmAccount();
      const result = await useCase.execute({ verifyCode });
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(500).json(err.message);
    }
  }

  async login(req: Request<LoginDto>, res: Response) {
    try {
      const useCase = makeLogin();
      const result = await useCase.execute(req.body);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(500).json(err.message);
    }
  }

  async generateTelegramUrl(
    req: Request<GenerateTelegramUrlDto>,
    res: Response
  ) {
    try {
      const useCase = makeGenerateTelegramUrl();
      const result = await useCase.execute(req.body);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(500).json(err.message);
    }
  }
}
