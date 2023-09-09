import config from "config";
import nodemailer from "nodemailer";
import {
  IEmailService,
  EmailOptions,
} from "../../../usecases/protocols/messageria/email-service";

export class NodeMailerMailService implements IEmailService {
  async send(options: EmailOptions) {
    const transporter = nodemailer.createTransport({
      host: config.get("smtp.host"),
      port: config.get("smtp.port"),
      secure: true,
      auth: {
        user: config.get("smtp.user"),
        pass: config.get("smtp.pass"),
      },
    });

    await transporter.sendMail({
      from: config.get("smtp.host"),
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return;
  }
}
