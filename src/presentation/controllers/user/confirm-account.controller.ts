import {
  IConfirmAccount,
  ConfirmAccountDto,
} from "../../../domain/usecases/confirm-account";
import { Controller, HttpRequest, HttpResponse } from "../../protocols/http";
import { ok, serverError } from "../../protocols/status";

export class ConfirmAccountController implements Controller {
  constructor(private readonly confirmAccount: IConfirmAccount) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { verifyCode } = httpRequest.params as ConfirmAccountDto;
      const response = await this.confirmAccount.execute({ verifyCode });
      return ok({ user: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
