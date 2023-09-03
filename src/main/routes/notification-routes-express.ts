import { Router } from "express";
import { NotificationController } from "../../controllers/notification-controller";
import { jwtAuthentication } from "../../main/middlewares/auth";
import { sendNotificationValidation } from "../../main/middlewares/validators/notification-validator";
import { checkRules } from "../../main/middlewares/validators/validator";

const notificationController = new NotificationController();

const notificationRoutes = Router();
notificationRoutes.post(
  "/",
  jwtAuthentication,
  sendNotificationValidation,
  checkRules,
  notificationController.createNotification
);

export default notificationRoutes;
