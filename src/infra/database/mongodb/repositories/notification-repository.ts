import { Notification } from "../../../../domain/entities/notification";
import { WithId } from "../../../../usecases/protocols/repositories/index.ts";
import { INotificationRepository } from "../../../../usecases/protocols/repositories/notification-repository";

import NotificationModel from "../models/notification";

export class NotificationRepository implements INotificationRepository {
  async create(
    data: Partial<Notification>
  ): Promise<WithId<Notification> | null> {
    const obj = await NotificationModel.create(data);
    return { ...obj.toJSON(), id: obj.id };
  }
  async findById(id: string): Promise<WithId<Notification> | null> {
    return await NotificationModel.findById(id);
  }
  async find(
    data: Partial<Notification>
  ): Promise<WithId<Notification>[] | null> {
    return await NotificationModel.find(data);
  }
  async findOne(
    data: Partial<Notification>
  ): Promise<WithId<Notification> | null> {
    return await NotificationModel.findOne(data);
  }
}
