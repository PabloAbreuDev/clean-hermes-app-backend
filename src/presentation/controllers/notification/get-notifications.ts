import {
  GetNotificationsDto,
  IGetnotifications,
} from "../../../domain/usecases/get-notification";
import { Controller, HttpRequest, HttpResponse } from "../../protocols/http";
import { ok, serverError } from "../../helpers/status";

export class GetNotificationsController implements Controller {
  constructor(private readonly getNotifications: IGetnotifications) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params as GetNotificationsDto;
      const response = await this.getNotifications.execute({
        userId,
      });
      return ok({ success: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
