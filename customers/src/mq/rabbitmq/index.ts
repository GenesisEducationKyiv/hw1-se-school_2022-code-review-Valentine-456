import { FastifyInstance } from "fastify";
import { assertMQs, addQueueConsumer } from "./hooks";
import { MessageBrokerOptions } from "./messageBrokerOptions.enum";

async function addApplicationLogsFromRabbitMQ(fastify: FastifyInstance) {
  await assertMQs(fastify);

  await addQueueConsumer(fastify, MessageBrokerOptions.queues.error);
}

export { addApplicationLogsFromRabbitMQ, MessageBrokerOptions };
