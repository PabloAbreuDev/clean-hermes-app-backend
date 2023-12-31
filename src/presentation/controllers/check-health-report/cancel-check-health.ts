import {
  CancelCheckHealthDto,
  ICancelCheckHealth,
} from "../../../domain/usecases/cancel-check-health";
import { Controller, HttpRequest, HttpResponse } from "../../protocols/http";
import { ok, serverError } from "../../helpers/status";

export class CancelCheckHealthController implements Controller {
  constructor(private readonly cancelCheckHealth: ICancelCheckHealth) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest;
      const { checkHealthId } = httpRequest.params as CancelCheckHealthDto;
      const response = await this.cancelCheckHealth.execute({
        checkHealthId,
        userId,
      });
      return ok({ success: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
