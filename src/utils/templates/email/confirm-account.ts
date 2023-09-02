import config from "config";

export const confirmAccountTemplate = (verifyCode: string) => {
  return `Welcome to hermes app, verify your account:
   ${config.get("baseurl")}/users/${verifyCode}`;
};
