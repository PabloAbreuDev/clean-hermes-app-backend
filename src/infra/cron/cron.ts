import { CronJob } from "cron";
import {
  CreateCronJobDto,
  ICronJob,
  activeJob,
} from "../../usecases/protocols/cron/cron-job";
import { LoggerWithPino } from "../logger/logger-adapter";

export class CronManage implements ICronJob {
  public activeJobs: activeJob[] = [];
  create(data: CreateCronJobDto): boolean {
    const logger = new LoggerWithPino();
    try {
      const job = new CronJob(data.cronExpression, data.callBackFunction);
      job.start();
      logger.info({ description: "event added to cron" });
      this.activeJobs.push({
        id: data.id,
        job: job,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
