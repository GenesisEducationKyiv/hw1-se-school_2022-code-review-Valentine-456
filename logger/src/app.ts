import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import { FastifyPluginAsync } from "fastify";
import {addApplicationLogsFromRabbitMQ} from "./mq/rabbitmq"


export type AppOptions = Record<string, never> & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts
  });

  fastify.register(fastifyEnv, {
    schema: {},
    dotenv: true
  });
  
  await addApplicationLogsFromRabbitMQ(fastify);
};

export default app;
export { app };
