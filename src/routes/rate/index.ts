import { FastifyPluginAsync } from "fastify";
import CurrencyRateService from "../../services/currencyRateService"

const rate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get("/", getCurrencyRate)
}

export default rate

// Controllers are here

async function getCurrencyRate(request: any, reply: any) {
    const rate = await CurrencyRateService.getRate();
    if(rate === null)
        return reply.badRequest("Invalid status value")
    return rate
}

