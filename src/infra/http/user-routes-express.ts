import { Router } from "express";
import { UserController } from "../../controllers/user-controller";
import { checkRules } from "./middlewares/validators/validator";
import { registerUserValidation } from "./middlewares/validators/user-validator";

const userController = new UserController();

const userRoutes = Router();
userRoutes.post(
  "/",
  registerUserValidation,
  checkRules,
  userController.registerUser
);
userRoutes.get("/:verifyCode", userController.confirmAccount);
userRoutes.post("/login", userController.login);

export default userRoutes;
