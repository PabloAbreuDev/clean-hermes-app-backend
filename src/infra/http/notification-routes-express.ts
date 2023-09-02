import { Router } from "express";
import { NotificationController } from "../../controllers/notification-controller";
import { sendNotificationValidation } from "./middlewares/validators/notification-validator";
import { checkRules } from "./middlewares/validators/validator";

const notificationController = new NotificationController();

const notificationRoutes = Router();
notificationRoutes.post(
  "/",
  sendNotificationValidation,
  checkRules,
  notificationController.createNotification
);

export default notificationRoutes;
