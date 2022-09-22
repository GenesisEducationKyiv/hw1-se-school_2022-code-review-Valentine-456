import { createTransport } from "nodemailer";
import {
  IEmailSenderService,
  IEmailSenderServiceFactory,
  IMailOptions,
  IMailingListOptions
} from "../../../interfaces/emailSenderService";

class SendgridEmailService implements IEmailSenderService {
  private nodemailer = createTransport({
    host: "smtp.sendgrid.net",
    port: 25,
    auth: {
      user: "apikey",
      pass: `${process.env.API_KEY_1}${process.env.API_KEY_2}`
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  public async sendMail(opts: IMailOptions): Promise<void> {
    try {
      this.nodemailer.sendMail({ ...opts, from: process.env.EMAIL_FROM });
    } catch (error) {
      console.log(error);
    }
  }
  public async sendMailingList(
    opts: IMailingListOptions,
    mailingList: Array<string>
  ): Promise<void> {
    try {
      await Promise.allSettled(
        mailingList.map((email) => this.sendMail({ ...opts, to: email }))
      );
    } catch (error) {
      console.log(error);
    }
  }
}

class SendgridEmailServiceFactory implements IEmailSenderServiceFactory {
  createEmailSenderService(): IEmailSenderService {
    return new SendgridEmailService();
  }
}

export { SendgridEmailServiceFactory };
