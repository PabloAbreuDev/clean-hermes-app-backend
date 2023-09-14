import { Schema, model } from "mongoose";
import { CheckHealthReport } from "../../../../domain/entities/check-health-report";

const checkHealthReportSchema = new Schema<CheckHealthReport>(
  {
    userId: { type: String, required: true },
    active: { type: Boolean, required: true },
    logs: { type: Schema.Types.Mixed },
    urlToCheck: { type: String, required: true },
  },
  { timestamps: true }
);

const CheckHealthReportModel = model<CheckHealthReport>(
  "CheckHealthReport",
  checkHealthReportSchema
);

export default CheckHealthReportModel;
