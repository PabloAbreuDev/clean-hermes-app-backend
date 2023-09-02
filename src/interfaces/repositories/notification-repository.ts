import { Notification } from "../../entities/notification";
import { IBaseRepository } from "./base-repository";

export interface INotificationRepository
  extends IBaseRepository<Notification> {}
