import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { subscribeValidationSchema, ISubscribeBody } from "./index.schemas";
import { HttpResponseMessage } from "../../utils/httpResponseMessage.enum";
import { subscribtionRepository } from "../../repositories/index";

const subscribe: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{ Body: ISubscribeBody }>(
    "/",
    subscribeValidationSchema,
    subscribeEmail
  );
};

export default subscribe;

async function subscribeEmail(
  request: FastifyRequest<{ Body: ISubscribeBody }>,
  reply: FastifyReply
) {
  if (request.validationError)
    return reply.badRequest(HttpResponseMessage.EMAIL_VALIDATION_FAILED);

  const { email } = request.body;
  const subscribtion = await subscribtionRepository.createOne(email);
  if (!subscribtion) return reply.conflict(HttpResponseMessage.EMAIL_EXISTS);
  return { status: "success", message: HttpResponseMessage.EMAIL_ADDED };
}
