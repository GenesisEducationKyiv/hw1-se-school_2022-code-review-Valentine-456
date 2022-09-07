import { createTransport } from "nodemailer";

interface IMailingListOptions {
  html?: string;
  subject: string;
}

interface IMailOptions extends IMailingListOptions {
  to: string;
}

class EmailSenderService {
  private static nodemailer = createTransport({
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

  public static async sendMail(opts: IMailOptions): Promise<void> {
    try {
      this.nodemailer.sendMail({ ...opts, from: process.env.EMAIL_FROM });
    } catch (error) {
      console.log(error);
    }
  }
  public static async sendMailingList(
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

export default EmailSenderService;
export { IMailOptions, IMailingListOptions };
