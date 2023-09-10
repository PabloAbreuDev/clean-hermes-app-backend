import { CheckHealthReport } from "../../../../domain/entities/check-health-report";
import { ICheckHealthReportRepository } from "../../../../usecases/protocols/repositories/check-health-report-repository";
import { WithId } from "../../../../usecases/protocols/repositories/index.ts";
import CheckHealthReportModel from "../models/check-health-report";

export class CheckHealthReportRepository
  implements ICheckHealthReportRepository
{
  async create(
    data: Partial<CheckHealthReport>
  ): Promise<WithId<CheckHealthReport> | null> {
    return (await CheckHealthReportModel.create(data)).toJSON();
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
}
