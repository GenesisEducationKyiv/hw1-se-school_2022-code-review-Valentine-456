import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { subscribeValidationSchema, ISubscribeBody } from "./index.schemas";
import Subscribtion from "../../database/models/subscribtion.model";
import { HttpResponseMessage } from "../../utils/httpResponseMessage.enum";

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
  const candidate = await Subscribtion.findOneByEmail(email);
  if (candidate) return reply.conflict(HttpResponseMessage.EMAIL_EXISTS);

  await new Subscribtion(email).save();
  return { status: "success", message: HttpResponseMessage.EMAIL_ADDED };
}
