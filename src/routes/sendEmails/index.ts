import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import Subscribtion from "../../database/models/subscribtion.model";
import { sendMail } from "../../utils/emails";
import CurrencyRateService from "../../services/currencyRateService"


const sendEmails: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post("/", sendEmailsHandler)
}

export default sendEmails

// Controllers are here

async function sendEmailsHandler(request: FastifyRequest, reply: FastifyReply) {
    const rate = await CurrencyRateService.getRate();
    const subject = "Exchange rate: BTC to UAH"

    const subs = await Subscribtion.findMany();
    try {
        await Promise.allSettled(subs.map(sub => sendMail({subject, text: rate?.toString(), to: sub.email}))) 
    } catch (error){
        console.log(error)
    }
    return {status: "success", message: "Mailing is sent out!"}
}