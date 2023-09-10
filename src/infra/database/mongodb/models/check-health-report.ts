import mongoose, { Schema, Types, model } from "mongoose";
import { Notification } from "../../../../domain/entities/notification";
import { CheckHealthReport } from "../../../../domain/entities/check-health-report";

const checkHealthReportSchema = new Schema<CheckHealthReport>({
  userId: { type: String, required: true },
  active: { type: Boolean, required: true },
  logs: { type: Schema.Types.Mixed },
  urlToCheck: { type: String, required: true },
});

const CheckHealthReportModel = model<CheckHealthReport>(
  "CheckHealthReport",
  checkHealthReportSchema
);

export default CheckHealthReportModel;
