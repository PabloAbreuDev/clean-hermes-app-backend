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

export default Logger;
