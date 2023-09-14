import { Notification } from "../../../../domain/entities/notification";
import { AlreadyExists } from "../../../../usecases/protocols/repositories/index.ts";
import { INotificationRepository } from "../../../../usecases/protocols/repositories/notification-repository";

import NotificationModel from "../models/notification";

export class NotificationRepository implements INotificationRepository {
  async create(
    data: Partial<Notification>
  ): Promise<AlreadyExists<Notification> | null> {
    const obj = await NotificationModel.create(data);
    return { ...obj.toJSON(), id: obj.id };
  }
  async findById(id: string): Promise<AlreadyExists<Notification> | null> {
    return await NotificationModel.findById(id);
  }
  async find(
    data: Partial<Notification>
  ): Promise<AlreadyExists<Notification>[] | null> {
    return await NotificationModel.find(data);
  }
  async findOne(
    data: Partial<Notification>
  ): Promise<AlreadyExists<Notification> | null> {
    return await NotificationModel.findOne(data);
  }
}
