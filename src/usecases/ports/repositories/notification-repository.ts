import { IBaseRepository } from "./base-repository";
import { Notification } from "../../../entities/notification";

export interface INotificationRepository
  extends IBaseRepository<Notification> {}
