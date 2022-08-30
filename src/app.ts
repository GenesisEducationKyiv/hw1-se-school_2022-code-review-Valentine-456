import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import { FastifyPluginAsync } from "fastify";

export type AppOptions = Record<string, never> & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    ignorePattern: /.*(test|schemas).ts/,
    options: { ...opts, prefix: "/api" },
  });

  fastify.register(fastifyEnv, {
    schema: {},
    dotenv: true,
  });
};

export default app;
export { app };
