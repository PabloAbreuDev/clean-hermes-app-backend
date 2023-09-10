import {
  CheckHealthReport,
  LogHealthCheck,
} from "../../../../domain/entities/check-health-report";
import { ICheckHealthReportRepository } from "../../../../usecases/protocols/repositories/check-health-report-repository";
import { WithId } from "../../../../usecases/protocols/repositories/index.ts";
import CheckHealthReportModel from "../models/check-health-report";

export class CheckHealthReportRepository
  implements ICheckHealthReportRepository
{
  async create(
    data: Partial<CheckHealthReport>
  ): Promise<WithId<CheckHealthReport> | null> {
    const obj = await CheckHealthReportModel.create(data);
    return { ...obj.toJSON(), id: obj.id };
  }
  async findById(id: string): Promise<WithId<CheckHealthReport> | null> {
    return await CheckHealthReportModel.findById(id);
  }
  async find(
    data: Partial<CheckHealthReport>
  ): Promise<WithId<CheckHealthReport>[] | null> {
    return await CheckHealthReportModel.find(data);
  }
  async findOne(
    data: Partial<CheckHealthReport>
  ): Promise<WithId<CheckHealthReport> | null> {
    return await CheckHealthReportModel.findOne(data);
  }
  async addReport(
    log: LogHealthCheck,
    id: string
  ): Promise<CheckHealthReport | null> {
    const obj = await CheckHealthReportModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          logs: log,
        },
      },
      {
        new: true,
      }
    );
    return obj ? (obj.toObject() as WithId<CheckHealthReport>) : null;
  }
}
