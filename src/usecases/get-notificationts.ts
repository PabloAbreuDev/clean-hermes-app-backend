import { Notification } from "../domain/entities/notification";
import {
  GetNotificationsDto,
  IGetnotifications,
} from "../domain/usecases/get-notification";
import { UserNotFoundError } from "./errors/user-not-found";
import { WithId } from "./protocols/repositories/index.ts";
import { INotificationRepository } from "./protocols/repositories/notification-repository";
import { IUserRepository } from "./protocols/repositories/user-repository";

export class GetNotifications implements IGetnotifications {
  constructor(
    private readonly notificationRepository: INotificationRepository,
    private readonly userRepository: IUserRepository
  ) {}
  async execute(
    data: GetNotificationsDto
  ): Promise<WithId<Notification>[] | null> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return await this.notificationRepository.find({
      userId: data.userId,
    });
  }
}
