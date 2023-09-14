import {
  GetCheckHealthReportsDto,
  IGetCheckHealthReports,
} from "../../../domain/usecases/get-check-health-reports";
import { Controller, HttpRequest, HttpResponse } from "../../protocols/http";
import { ok, serverError } from "../../helpers/status";

export class GetCheckHealthReportsController implements Controller {
  constructor(private readonly getHealthCheckReports: IGetCheckHealthReports) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params as GetCheckHealthReportsDto;
      const response = await this.getHealthCheckReports.execute({
        userId,
      });
      return ok({ success: response });
    } catch (err: any) {
      return serverError(err);
    }
  }
}
