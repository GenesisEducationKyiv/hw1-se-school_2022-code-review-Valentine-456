import fp from "fastify-plugin";
import FastifyMultipart, { FastifyMultipartOptions } from "@fastify/multipart";

export default fp<FastifyMultipartOptions>(async (fastify) => {
  fastify.register(FastifyMultipart, {
    attachFieldsToBody: true,
    addToBody: true,
  });
});
