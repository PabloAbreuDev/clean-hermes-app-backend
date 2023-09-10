import { UsecaseError } from "./usecase-error";

export class CreateCheckHealthReportError
  extends Error
  implements UsecaseError
{
  constructor() {
    super("Error creating check health report");
    this.name = "CreateCheckHealthReport";
  }
}
