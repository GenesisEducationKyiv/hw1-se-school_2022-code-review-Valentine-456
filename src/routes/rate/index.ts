import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { mainCurrencyRateService } from "../../services/currecyRate.service";
import { HttpResponseMessage } from "../../utils/httpResponseMessage.enum";

const rate: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", getCurrencyRate);
};

export default rate;

async function getCurrencyRate(request: FastifyRequest, reply: FastifyReply) {
  const rate = await mainCurrencyRateService.getRate();
  if (rate === null)
    return reply.badRequest(HttpResponseMessage.INVALID_STATUS_VALUE);
  return rate;
}
