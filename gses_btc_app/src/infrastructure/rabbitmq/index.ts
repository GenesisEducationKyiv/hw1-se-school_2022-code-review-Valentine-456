import { FastifyInstance } from "fastify";
import {
  assertMQs,
  addRequestLogging,
  addResponseLogging,
  addErrorLogging
} from "./hooks";
import { MessageBrokerOptions } from "./messageBrokerOptions.enum";

async function addApplicationLogsToRabbitMQ(fastify: FastifyInstance) {
  await assertMQs(fastify);

  await addRequestLogging(fastify);
  await addResponseLogging(fastify);
  await addErrorLogging(fastify);
}

export { addApplicationLogsToRabbitMQ, MessageBrokerOptions };
