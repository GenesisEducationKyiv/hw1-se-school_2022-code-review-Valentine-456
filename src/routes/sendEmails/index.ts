import { FastifyPluginAsync } from "fastify";
import Subscribtion from "../../database/models/subscribtion.model";
import CurrencyRateService from "../../services/currencyRate.service";
import EmailSenderService from "../../services/emailSender.service";
import { HttpResponseMessage } from "../../utils/httpResponseMessage.enum";

const sendRateEmails: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post("/", sendRateEmailsHandler);
};

export default sendRateEmails;

async function sendRateEmailsHandler() {
  const rate = await CurrencyRateService.getRate();
  const subject = "Exchange rate: BTC to UAH";
  const mailingListOptions = { subject, html: rate?.toString() };

  const emails = (await Subscribtion.findMany()).map(
    (subscription) => subscription.email
  );
  await EmailSenderService.sendMailingList(mailingListOptions, emails);

  return { status: "success", message: HttpResponseMessage.EMAILS_SENT };
}
