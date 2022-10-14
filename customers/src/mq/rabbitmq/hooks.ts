import { FastifyInstance } from "fastify";
import { MessageBrokerOptions } from "./messageBrokerOptions.enum";

async function assertMQs(fastify: FastifyInstance) {
  fastify.addHook("onReady", async () => {
    await fastify.amqp.channel.assertQueue(MessageBrokerOptions.queues.info);
    await fastify.amqp.channel.assertQueue(MessageBrokerOptions.queues.error);
  });
}

async function addQueueConsumer(fastify: FastifyInstance, queueName: string) {
  fastify.addHook("onReady", async () => {
  fastify.amqp.channel.consume(queueName, (msg) => {
    if (msg !== null) {
      console.log(`${queueName.toUpperCase()}:`, msg.content.toString());
      fastify.amqp.channel.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
  });
}

export { assertMQs, addQueueConsumer };
