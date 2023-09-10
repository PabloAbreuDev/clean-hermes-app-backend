import { Schema, Types, model } from "mongoose";
import { Notification } from "../../../../domain/entities/notification";

const notificationSchema = new Schema<Notification>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
  additionalInfo: { type: Schema.Types.Mixed },
});

const NotificationModel = model<Notification>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
