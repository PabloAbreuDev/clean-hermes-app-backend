export interface LogHealthCheck {
  checkDate: Date;
  result: "OK" | "ERROR";
  responseTime: number;
}

export class CheckHealthReport {
  public urlToCheck: string;
  public userId: string;
  public active: boolean;
  public logs: LogHealthCheck[];

  constructor(props: { urlToCheck: string; userId: string }) {
    if (!props.urlToCheck || props.urlToCheck.length < 3) {
      throw new Error("You must enter a valid url to check");
    }

    if (!props.userId) {
      throw new Error("User id invalid");
    }

    this.urlToCheck = props.urlToCheck;
    this.userId = props.userId;
    this.active = true;
    this.logs = [];
  }
}
