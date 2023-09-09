import { ok, serverError } from "../../protocols/status";
import { Controller, HttpRequest, HttpResponse } from "../../protocols/http";
import { ILogin, LoginDto } from "../../../domain/usecases/login";

export class LoginController implements Controller {
  constructor(private readonly loginService: ILogin) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body as LoginDto;
      const response = await this.loginService.execute({ email, password });
      return ok({ token: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
