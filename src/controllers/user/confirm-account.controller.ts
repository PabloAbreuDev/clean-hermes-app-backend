import {
  ConfirmAccountDto,
  IConfirmAccount,
} from "../../usecases/confirm-account";
import { Controller, HttpRequest, HttpResponse } from "../ports/http";
import { ok, serverError } from "../ports/status";

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
