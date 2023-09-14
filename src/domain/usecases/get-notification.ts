import { AlreadyExists } from "../../usecases/protocols/repositories/index.ts";
import { Notification } from "../entities/notification";

export interface GetNotificationsDto {
  userId: string;
}
export interface IGetnotifications {
  execute(
    data: GetNotificationsDto
  ): Promise<AlreadyExists<Notification>[] | null>;
}
