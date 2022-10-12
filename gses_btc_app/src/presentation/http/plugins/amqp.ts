import fp from "fastify-plugin";
import fastifyAmqpPlugin from "fastify-amqp";

export default fp(async (fastify) => {
  fastify.register(fastifyAmqpPlugin, {
    hostname: "rabbitmq",
    port: 5672,
    username: "username",
    password: "password",
    vhost: ""
  });
});
