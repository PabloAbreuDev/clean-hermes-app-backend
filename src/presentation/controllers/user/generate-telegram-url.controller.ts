import {
  IGenerateTelegramUrl,
  GenerateTelegramUrlDto,
} from "../../../domain/usecases/generate-telegram-url";
import { Controller, HttpRequest, HttpResponse } from "../../protocols/http";
import { created, serverError } from "../../protocols/status";

export class GenerateTelegramURLController implements Controller {
  constructor(private readonly generateTelegramToken: IGenerateTelegramUrl) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.body as GenerateTelegramUrlDto;
      const response = await this.generateTelegramToken.execute({ id });
      return created({ telegramUrl: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}