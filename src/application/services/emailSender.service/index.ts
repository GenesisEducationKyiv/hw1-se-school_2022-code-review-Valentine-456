import { SendgridEmailServiceFactory } from "./providers/SendGrid.provider";
import { MailjetEmailServiceFactory } from "./providers/Mailjet.provider";
import { IEmailSenderService } from "../../../domain/services/emailSenderService";

let emailsSenderService: IEmailSenderService;

const emailSender1 =
  new SendgridEmailServiceFactory().createEmailSenderService();
const emailSender2 =
  new MailjetEmailServiceFactory().createEmailSenderService();

switch (process.env.EMAIL_SERVICE) {
  case "sendgrid":
    emailsSenderService = emailSender1;
    break;
  case "mailjet":
    emailsSenderService = emailSender2;
    break;
}

export { emailsSenderService, emailSender2 };
