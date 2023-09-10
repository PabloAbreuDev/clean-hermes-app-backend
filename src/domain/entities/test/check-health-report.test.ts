import { CheckHealthReport } from "../check-health-report";

describe("Check Health Report entity", () => {
  it("Should create a check health report succefully", () => {
    const dummyCheckHealthReport = {
      urlToCheck: "http://site.com",
      userId: "123",
    };
    const checkHealthReport = new CheckHealthReport(dummyCheckHealthReport);
    expect(checkHealthReport).toMatchObject(dummyCheckHealthReport);
  });
  it("Should thrown an error if url to check is invalid", () => {
    const dummyCheckHealthReport = {
      urlToCheck: "h",
      userId: "123",
    };
    expect(() => new CheckHealthReport(dummyCheckHealthReport)).toThrow(
      new Error("You must enter a valid url to check")
    );
  });

  it("Should thrown an error if user id is invalid", () => {
    const dummyCheckHealthReport = {
      urlToCheck: "http://site.com",
      userId: "",
    };
    expect(() => new CheckHealthReport(dummyCheckHealthReport)).toThrow(
      new Error("User id invalid")
    );
  });
});
