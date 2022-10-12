import { FastifyInstance } from "fastify";
import { MessageBrokerOptions } from "./messageBrokerOptions.enum";

async function assertMQs(fastify: FastifyInstance) {
  fastify.addHook("onReady", async () => {
    await fastify.amqp.channel.assertQueue(MessageBrokerOptions.queues.info);
    await fastify.amqp.channel.assertQueue(MessageBrokerOptions.queues.error);
  });
}
async function addRequestLogging(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (req) => {
    await fastify.amqp.channel.sendToQueue(
      MessageBrokerOptions.queues.info,
      Buffer.from(
        JSON.stringify({
          request: {
            id: req.id,
            route: req.url,
            method: req.method,
            time: new Date()
          }
        })
      )
    );
  });
}
async function addResponseLogging(fastify: FastifyInstance) {
  fastify.addHook("onResponse", async (req, res) => {
    const { info, error } = MessageBrokerOptions.queues;
    const queue = res.statusCode < 500 ? info : error;

    await fastify.amqp.channel.sendToQueue(
      queue,
      Buffer.from(
        JSON.stringify({
          response: {
            code: res.statusCode,
            route: req.url,
            method: req.method,
            time: new Date()
          }
        })
      )
    );
  });
}
async function addErrorLogging(fastify: FastifyInstance) {
  fastify.addHook("onError", async (req, res, error) => {
    await fastify.amqp.channel.sendToQueue(
      MessageBrokerOptions.queues.error,
      Buffer.from(
        JSON.stringify({
          error: {
            message: error.message,
            code: error.code,
            name: error.name,
            time: new Date()
          }
        })
      )
    );
  });
}

export { addErrorLogging, addRequestLogging, addResponseLogging, assertMQs };
