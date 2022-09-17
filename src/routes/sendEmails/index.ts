import { FastifyPluginAsync } from "fastify";
import { mainCurrencyRateService } from "../../services/index";
import EmailSenderService from "../../services/emailSender.service";
import { HttpResponseMessage } from "../../utils/httpResponseMessage.enum";
import { subscribtionRepository } from "../../repositories";

const sendRateEmails: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post("/", sendRateEmailsHandler);
};

export default sendRateEmails;

async function sendRateEmailsHandler() {
  const rate = await mainCurrencyRateService.getRate();
  const subject = "Exchange rate: BTC to UAH";
  const mailingListOptions = { subject, html: rate?.toString() };

  const subscribtions = await subscribtionRepository.findAll();
  const emails = subscribtionRepository.serializeToEmails(subscribtions);

  await EmailSenderService.sendMailingList(mailingListOptions, emails);
  return { status: "success", message: HttpResponseMessage.EMAILS_SENT };
}
