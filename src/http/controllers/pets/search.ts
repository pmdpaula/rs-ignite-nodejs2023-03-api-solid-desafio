import { makeFetchPetsByCharacteristicsUseCase } from "@/use-cases/factories/pet/make-fetch-pets-by-characteristics-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchPetQuerySchema = z.object({
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    independenceLevel: z.string().optional(),
  });

  const { age, size, energyLevel, independenceLevel } = searchPetQuerySchema.parse(
    request.query,
  );

  try {
    const fetchPetsByCharacteristicsUseCase = makeFetchPetsByCharacteristicsUseCase();

    const result = await fetchPetsByCharacteristicsUseCase.execute({
      age,
      size,
      energyLevel,
      independenceLevel,
    });

    return reply.status(200).send({ pets: result.value?.pets });
  } catch (error) {
    return reply.status(500).send({ message: error });
  }
};
