import { Router } from "express";
import { jwtAuthentication } from "../../main/middlewares/auth";
import { sendNotificationValidation } from "../../main/middlewares/validators/notification-validator";
import { checkRules } from "../../main/middlewares/validators/validator";
import { adaptRoute } from "../adapter/express/express-route-adapter";
import { makeSendNotification } from "../factories/send-notification";

const notificationRoutes = Router();
notificationRoutes.post(
  "/",
  jwtAuthentication,
  sendNotificationValidation,
  checkRules,
  adaptRoute(makeSendNotification())
);

export default notificationRoutes;
