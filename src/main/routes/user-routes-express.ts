import { Router } from "express";
import { checkRules } from "../../main/middlewares/validators/validator";
import { registerUserValidation } from "../../main/middlewares/validators/user-validator";
import { adaptRoute } from "../adapter/express/express-route-adapter";
import { makeRegisterUserController } from "../factories/register-user";
import { makeConfirmAccount } from "../factories/confirm-account";
import { makeUserLoginController } from "../factories/login";
import { makeGenerateTelegramUrl } from "../factories/generate-telegram-token";

const userRoutes = Router();
userRoutes.post(
  "/",
  registerUserValidation,
  checkRules,
  adaptRoute(makeRegisterUserController())
);
userRoutes.get("/:verifyCode", adaptRoute(makeConfirmAccount()));
userRoutes.post("/login", adaptRoute(makeUserLoginController()));
userRoutes.post("/telegram", adaptRoute(makeGenerateTelegramUrl()));

export default userRoutes;
