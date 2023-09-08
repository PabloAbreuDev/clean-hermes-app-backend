import { IBaseRepository } from "./index.ts";
import { INotification } from "../../../entities/notification";

export interface INotificationRepository
	extends IBaseRepository<INotification> {}
