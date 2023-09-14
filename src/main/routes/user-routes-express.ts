import { Router } from "express";
import { checkRules } from "../../main/middlewares/validators/validator";
import {
  loginValidation,
  registerUserValidation,
} from "../../main/middlewares/validators/user-validator";
import { adaptRoute } from "../adapter/express/express-route-adapter";
import { makeRegisterUserController } from "../factories/register-user";
import { makeConfirmAccount } from "../factories/confirm-account";
import { makeUserLoginController } from "../factories/login";
import { makeGenerateTelegramUrl } from "../factories/generate-telegram-token";
import { jwtAuthentication } from "../middlewares/auth";

const userRoutes = Router();
userRoutes.post(
  "/",
  registerUserValidation,
  checkRules,
  adaptRoute(makeRegisterUserController())
);
userRoutes.get("/:verifyCode", adaptRoute(makeConfirmAccount()));
userRoutes.post(
  "/login",
  loginValidation,
  checkRules,
  adaptRoute(makeUserLoginController())
);
userRoutes.post(
  "/telegram",
  jwtAuthentication,
  adaptRoute(makeGenerateTelegramUrl())
);

export default userRoutes;
