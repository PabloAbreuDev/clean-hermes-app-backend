import {
  CreateCheckHealthReportDto,
  ICreateCheckHealthReport,
} from "../../../domain/usecases/create-check-health-report";
import { Controller, HttpRequest, HttpResponse } from "../../protocols/http";
import { created, serverError } from "../../helpers/status";

export class CreateCheckHealthReportController implements Controller {
  constructor(
    private readonly createCheckHealthReport: ICreateCheckHealthReport
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { url, userId } = httpRequest.body as CreateCheckHealthReportDto;
      const response = await this.createCheckHealthReport.execute({
        url,
        userId,
      });
      return created({ checkHealthReport: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
