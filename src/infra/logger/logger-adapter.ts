import { ILogger, loggerProps } from "../../usecases/protocols/logger/logger";
import pino from "pino";

const Logger = pino({
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "dd-mm-yyyy, h:MM:ss TT",
    },
  },
});

export class LoggerWithPino implements ILogger {
  info(data: loggerProps): void {
    Logger.info(data);
  }
  error(data: loggerProps): void {
    Logger.error(data);
  }
  warning(data: loggerProps): void {
    Logger.warn(data);
  }
}
