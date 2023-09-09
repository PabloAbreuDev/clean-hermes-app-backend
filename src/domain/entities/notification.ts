export class Notification {
  public name: string;
  public description: string;
  public additionalInfo: any;
  public userId: string;

  constructor(props: {
    name: string;
    description: string;
    additionalInfo?: any;
    userId: string;
  }) {
    if (!props.name || props.name.length < 2) {
      throw new Error("You must enter a valid name to this notification");
    }

    if (!props.description || props.description.length === 0) {
      throw new Error("You must enter a valid description");
    }

    if (!props.userId) {
      throw new Error("User id invalid");
    }

    this.name = props.name;
    this.description = props.description;
    this.additionalInfo = props.additionalInfo;
    this.userId = props.userId;
  }
}
