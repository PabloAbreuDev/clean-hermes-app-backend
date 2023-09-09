import { IBaseRepository } from "./index.ts";
import { Notification } from "../../../domain/entities/notification.js";

export interface INotificationRepository
  extends IBaseRepository<Notification> {}
