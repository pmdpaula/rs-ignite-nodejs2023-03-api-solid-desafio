import { makeFetchPetsByCityUseCase } from "@/use-cases/factories/pet/make-fetch-pets-by-city-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const fetchByCity = async (request: FastifyRequest, reply: FastifyReply) => {
  const fetchPetsByCityQuerySchema = z.object({
    state: z.string(),
    city: z.string(),
  });

  const { state, city } = fetchPetsByCityQuerySchema.parse(request.query);

  try {
    const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase();

    const result = await fetchPetsByCityUseCase.execute({
      state,
      city,
    });

    return reply.status(200).send({ pets: result.value?.pets });
  } catch (error: any) {
    return reply.status(400).send({ message: error.message });
  }
};
