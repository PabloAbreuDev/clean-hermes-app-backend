import { Schema, model } from "mongoose";
import { User } from "../../../../domain/entities/user";

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  telegramToken: { type: String, required: true },
  telegramChatId: { type: Number },
  verified: { type: Boolean, default: false },
  verifyCode: { type: String, required: true },
});

const UserModel = model<User>("User", userSchema);

export default UserModel;
