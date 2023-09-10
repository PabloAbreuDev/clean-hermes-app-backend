import { UsecaseError } from "./usecase-error";

export class CheckHealthReportNotFoundError
  extends Error
  implements UsecaseError
{
  constructor() {
    super("Check health not found.");
    this.name = "CheckHealthReportNotFound";
  }
}
