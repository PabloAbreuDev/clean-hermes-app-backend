import { Notification } from "../../../../entities/notification";
import { WithId } from "../../../../usecases/ports/repositories/index.ts";
import { INotificationRepository } from "../../../../usecases/ports/repositories/notification-repository";
import NotificationModel from "../models/notification";

export class NotificationRepository implements INotificationRepository {
  async create(
    data: Partial<Notification>
  ): Promise<WithId<Notification> | null> {
    return (await NotificationModel.create(data)).toJSON();
  }
  async findById(id: string): Promise<WithId<Notification> | null> {
    return await NotificationModel.findById(id);
  }
}
