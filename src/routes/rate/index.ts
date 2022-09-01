import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import CurrencyRateService from "../../services/currencyRate.service";
import { HttpResponseMessage } from "../../utils/httpResponseMessage.enum";

const rate: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", getCurrencyRate);
};

export default rate;

async function getCurrencyRate(request: FastifyRequest, reply: FastifyReply) {
  const rate = await CurrencyRateService.getRate();
  if (rate === null)
    return reply.badRequest(HttpResponseMessage.INVALID_STATUS_VALUE);
  return rate;
}
