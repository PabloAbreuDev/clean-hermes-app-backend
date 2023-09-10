import { Notification } from "../notification";
describe("Notification entity", () => {
  it("Should create a notification propertly", () => {
    const dummyNotification = {
      description: "A description",
      name: "A name",
      userId: "12345",
      additionalInfo: {
        sample: 1,
      },
    };
    const notification = new Notification(dummyNotification);

    expect(notification).toMatchObject(dummyNotification);
  });

  it("Should thrown an error if notification name is invalid", () => {
    const dummyNotification = {
      description: "A",
      name: "",
      userId: "12345",
      additionalInfo: {
        sample: 1,
      },
    };
    expect(() => new Notification(dummyNotification)).toThrow(
      new Error("You must enter a valid name to this notification")
    );
  });
  it("Should thrown an error if notification description is invalid", () => {
    const dummyNotification = {
      description: "",
      name: "A name",
      userId: "12345",
      additionalInfo: {
        sample: 1,
      },
    };
    expect(() => new Notification(dummyNotification)).toThrow(
      new Error("You must enter a valid description")
    );
  });
  it("Should thrown an error if notification userId is invalid", () => {
    const dummyNotification = {
      description: "A description",
      name: "A name",
      userId: "",
      additionalInfo: {
        sample: 1,
      },
    };
    expect(() => new Notification(dummyNotification)).toThrow(
      new Error("User id invalid")
    );
  });
});
