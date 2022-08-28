import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { subscribeValidationSchema, ISubscribeBody } from "./index.schemas"
import Subscribtion from "../../database/models/subscribtion.model";

const subscribe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post<{ Body: ISubscribeBody }>("/", subscribeValidationSchema, getSubscription)
}

export default subscribe

// Controllers are here

async function getSubscription(request: FastifyRequest<{ Body: ISubscribeBody }>, reply: FastifyReply) {
    if(request.validationError) return reply.badRequest("Email validation was not passed");

    const {email} = request.body
    const candidate = await Subscribtion.findOneByEmail(email)
    if(candidate) return reply.conflict("This email is already registered!")
    
    await new Subscribtion(email).save();
    return {status: "success", message: "This email is added"}
}
