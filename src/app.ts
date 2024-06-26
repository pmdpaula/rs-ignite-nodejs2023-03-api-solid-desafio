import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";

import { organizationsRoutes } from "./http/controllers/organizations/routes";
import { petsRoutes } from "./http/controllers/pets/routes";
import fastifyCookie from "@fastify/cookie";

export const app = fastify({ logger: true });

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: "10m" },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

app.register(fastifyCookie);

app.register(organizationsRoutes);
app.register(petsRoutes);

app.setErrorHandler((error, _, reply) => {
  // acima, quando não usamos o request, podemos usar o underline para ignorar o parâmetro

  if (error instanceof ZodError) {
    reply.status(400).send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    // TODO: Deveríamos enviar o log para uma ferramenta externa de monitoramento de erros (DataDog/NewRelic/Sentry)
  }

  return reply.status(500).send({ message: "Internal server error." });
});
