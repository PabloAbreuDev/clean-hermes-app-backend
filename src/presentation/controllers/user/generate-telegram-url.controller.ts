import {
  IGenerateTelegramUrl,
  GenerateTelegramUrlDto,
} from "../../../domain/usecases/generate-telegram-url";
import { Controller, HttpRequest, HttpResponse } from "../../protocols/http";
import { created, serverError } from "../../helpers/status";

export class GenerateTelegramURLController implements Controller {
  constructor(private readonly generateTelegramToken: IGenerateTelegramUrl) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest;
      const response = await this.generateTelegramToken.execute({ userId });
      return created({ telegramUrl: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
