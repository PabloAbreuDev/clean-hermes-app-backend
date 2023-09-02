import { makeSendNotification } from "../main/factories/send-notification";
import { SendNotificationDto } from "../usecases/send-notification";
import { Request, Response } from "./ports/http";
export class NotificationController {
  async createNotification(req: Request<SendNotificationDto>, res: Response) {
    try {
      const useCase = makeSendNotification();
      const result = await useCase.execute(req.body);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
