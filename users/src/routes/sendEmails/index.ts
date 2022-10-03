import { FastifyPluginAsync } from "fastify";
import { request as fetch } from "undici";
import { emailsSenderService } from "../../services/emailSender.service/index";
import { HttpResponseMessage } from "../../utils/httpResponseMessage.enum";
import { subscribtionRepository } from "../../repositories";

const sendRateEmails: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post("/", sendRateEmailsHandler);
};

export default sendRateEmails;

async function sendRateEmailsHandler() {
  console.log("data \n\n");

  const data = await fetch("http://localhost:5000/api/rate");
  console.log(data);
  const rate = await data.body;
  const subject = "Exchange rate: BTC to UAH";
  const mailingListOptions = { subject, html: rate?.toString() };

  const subscribtions = await subscribtionRepository.findAll();
  const emails = subscribtionRepository.serializeToEmails(subscribtions);

  await emailsSenderService.sendMailingList(mailingListOptions, emails);
  return { status: "success", message: HttpResponseMessage.EMAILS_SENT };
}
