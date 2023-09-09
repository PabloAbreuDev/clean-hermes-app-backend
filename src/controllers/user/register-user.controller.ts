import { IRegisterUser, RegisterUserDto } from "../../usecases/register-user";
import { Controller, HttpRequest, HttpResponse } from "../ports/http";
import { created, serverError } from "../ports/status";

export class RegisterUserController implements Controller {
  constructor(private readonly registerUser: IRegisterUser) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, name, password } = httpRequest.body as RegisterUserDto;
      const response = await this.registerUser.execute({
        email,
        name,
        password,
      });
      return created({ user: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
