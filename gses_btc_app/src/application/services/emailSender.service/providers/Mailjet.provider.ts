// I don't no why, but this dependency is working only via require import...

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mailjet = require("node-mailjet");
import {
  IEmailSenderService,
  IEmailSenderServiceFactory,
  IMailOptions,
  IMailingListOptions
} from "../../../../domain/services/emailSenderService";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_API
);

class MailjetEmailService implements IEmailSenderService {
  public async sendMail(opts: IMailOptions): Promise<void> {
    const data = {
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM
          },
          To: [
            {
              Email: opts.to
            }
          ],
          Subject: opts.subject,
          HTMLPart: opts.html
        }
      ]
    };

    await mailjet.post("send", { version: "v3.1" }).request(data);
  }
  public async sendMailingList(
    opts: IMailingListOptions,
    mailingList: string[]
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

class MailjetEmailServiceFactory implements IEmailSenderServiceFactory {
  createEmailSenderService(): IEmailSenderService {
    return new MailjetEmailService();
  }
}

export { MailjetEmailServiceFactory };
