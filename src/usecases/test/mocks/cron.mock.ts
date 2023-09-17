import { CronManage } from "../../../infra/cron/cron";

export const mockCron: jest.Mocked<CronManage> = {
  create: jest.fn(),
  cancel: jest.fn(),
};
