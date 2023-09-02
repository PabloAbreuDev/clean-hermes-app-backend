import { Schema, model } from "mongoose";
import { Notification } from "../../../../entities/notification";

const notificationSchema = new Schema<Notification>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const NotificationModel = model<Notification>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
