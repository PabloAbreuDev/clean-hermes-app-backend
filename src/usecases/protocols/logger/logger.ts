export interface loggerProps {
  description?: string;
  extraInfo?: any;
}

export interface ILogger {
  info(data: loggerProps): void;
  error(data: loggerProps): void;
  warning(data: loggerProps): void;
}
