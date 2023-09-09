import { ok, serverError } from "../ports/status";
import { ILogin, LoginDto } from "../../usecases/login";
import { Controller, HttpRequest, HttpResponse } from "../ports/http";

export class LoginController implements Controller {
  constructor(private readonly loginService: ILogin) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body as LoginDto;
      const response = await this.loginService.execute({ email, password });
      return ok(response);
    } catch (err: any) {
      return serverError(err);
    }
  }
}
