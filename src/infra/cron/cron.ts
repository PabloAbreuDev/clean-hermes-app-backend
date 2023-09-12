import { CronJob } from "cron";
import cron, { ScheduledTask } from "node-cron";
import { scheduleJob, scheduledJobs } from "node-schedule";
import {
  CancelCronJobDto,
  CreateCronJobDto,
  ICronJob,
} from "../../usecases/protocols/cron/cron-job";
import { LoggerWithPino } from "../logger/logger-adapter";
import CacheService from "../cache/cache";

export class CronManage implements ICronJob {
  private cacheService: CacheService;
  constructor() {
    this.cacheService = CacheService.getInstance();
  }

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
