export class Notification {
  public name: string;
  public description: string;
  public additionalInfo: any;

  constructor(props: {
    name: string;
    description: string;
    additionalInfo?: any;
  }) {
    if (!props.name || props.name.length < 2) {
      throw new Error("You must enter a valid name to this notification");
    }

    if (!props.description || props.description.length === 0) {
      throw new Error("You must enter a valid description");
    }

    this.name = props.name;
    this.description = props.description;
    this.additionalInfo = props.additionalInfo;
  }
}
