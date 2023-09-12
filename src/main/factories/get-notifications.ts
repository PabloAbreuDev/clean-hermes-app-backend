import { NotificationRepository } from "../../infra/database/mongodb/repositories/notification-repository";
import { UserRepository } from "../../infra/database/mongodb/repositories/user-repository";
import { GetNotificationsController } from "../../presentation/controllers/notification/get-notifications";
import { Controller } from "../../presentation/protocols/http";
import { GetNotifications } from "../../usecases/get-notificationts";

export const makeGetNotifications = (): Controller => {
  const notificationsRepository = new NotificationRepository();
  const userRepository = new UserRepository();
  const getNotifications = new GetNotifications(
    notificationsRepository,
    userRepository
  );
  const getNotificationsController = new GetNotificationsController(
    getNotifications
  );
  return getNotificationsController;
};
