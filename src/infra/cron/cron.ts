import { scheduleJob, scheduledJobs } from "node-schedule";
import {
  CancelCronJobDto,
  CreateCronJobDto,
  ICronJob,
} from "../../usecases/protocols/cron/cron-job";
import { LoggerWithPino } from "../logger/logger-adapter";

export class CronManage implements ICronJob {
  create(data: CreateCronJobDto): boolean {
    const logger = new LoggerWithPino();
    try {
      scheduleJob(
        `check-health:${data.id}`,
        data.cronExpression,
        data.callBackFunction
      );
      logger.info({ description: "event added to cron" });
      return true;
    } catch (error) {
      throw error;
    }
  }

  cancel(data: CancelCronJobDto): boolean {
    const key = `check-health:${data.id}`;
    const job = scheduledJobs[key];
    try {
      const canceled = job.cancel();
      return !!canceled;
    } catch (err) {
      return false;
    }
  }
}
