import { Notification } from "../../../../entities/notification";
import { INotificationRepository } from "../../../../interfaces/repositories/notification-repository";
import NotificationModel from "../models/notification";

export class NotificationRepository implements INotificationRepository {
  async create(data: Partial<Notification>): Promise<Notification | null> {
    return await NotificationModel.create(data);
  }
  async findById(id: string): Promise<Notification | null> {
    return await NotificationModel.findById(id);
  }
}
