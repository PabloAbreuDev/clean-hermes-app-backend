import {
  ISendNotification,
  SendNotificationDto,
} from "../../usecases/send-notification";
import { Controller, HttpRequest, HttpResponse } from "../ports/http";
import { created, serverError } from "../ports/status";

export class SendNotificationController implements Controller {
  constructor(private readonly sendNotification: ISendNotification) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        notification,
        receiverEmailOptions,
        receiverTelegramOptions,
        receiverType,
        userId,
      } = httpRequest.body as SendNotificationDto;
      const response = await this.sendNotification.execute({
        notification,
        receiverEmailOptions,
        receiverTelegramOptions,
        receiverType,
        userId,
      });
      return created({ notification: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
