import fp from 'fastify-plugin'
import FastifyMultipart, {FastifyMultipartOptions} from "@fastify/multipart"

export default fp<FastifyMultipartOptions>(async (fastify, opts) => {
    fastify.register(FastifyMultipart, {attachFieldsToBody: true, addToBody: true})
  })
