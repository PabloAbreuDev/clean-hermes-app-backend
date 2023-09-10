import { CheckHealthDto, ICheckHealth } from "../domain/usecases/check-health";
import { CheckHealthReportNotFoundError } from "./errors/check-health-not-found";
import { Client } from "./protocols/http/client";
import { ICheckHealthReportRepository } from "./protocols/repositories/check-health-report-repository";

export class CheckHealth implements ICheckHealth {
  constructor(
    private readonly checkHealthRepository: ICheckHealthReportRepository,
    private readonly client: Client
  ) {}
  async execute(data: CheckHealthDto): Promise<void> {
    try {
      console.log(data);
      const checkHealth = await this.checkHealthRepository.findById(
        data.checkHealthId
      );

      if (!checkHealth) {
        throw new CheckHealthReportNotFoundError();
      }
      await this.client.doRequest(data.urlToCheck, "GET");

      await this.checkHealthRepository.addReport(
        {
          checkDate: new Date(),
          result: "OK",
        },
        data.checkHealthId
      );
    } catch (err) {
      await this.checkHealthRepository.addReport(
        {
          checkDate: new Date(),
          result: "ERROR",
        },
        data.checkHealthId
      );
    }
  }
}
