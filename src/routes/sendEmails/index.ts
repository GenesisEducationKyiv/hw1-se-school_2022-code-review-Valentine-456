import { FastifyPluginAsync } from "fastify";
import Subscribtion from "../../database/models/subscribtion.model";
import { sendMail } from "../../utils/emails";
import CurrencyRateService from "../../services/currencyRateService";
import { HttpResponseMessage } from "../../utils/httpResponseMessage.enum";

const sendEmails: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post("/", sendEmailsHandler);
};

export default sendEmails;

async function sendEmailsHandler() {
  const rate = await CurrencyRateService.getRate();
  const subject = "Exchange rate: BTC to UAH";

  const subs = await Subscribtion.findMany();
  try {
    await Promise.allSettled(
      subs.map((sub) =>
        sendMail({ subject, text: rate?.toString(), to: sub.email })
      )
    );
  } catch (error) {
    console.log(error);
  }
  return { status: "success", message: HttpResponseMessage.EMAILS_SENT };
}
