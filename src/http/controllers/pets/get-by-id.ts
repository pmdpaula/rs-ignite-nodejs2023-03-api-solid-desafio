import { Either } from "@/core/either";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetPetByIdUseCase } from "@/use-cases/factories/pet/make-get-pet-by-id-use-case";
import { Pet } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const fetchPetsByCityQuerySchema = z.object({
    id: z.string(),
  });

  const { id } = fetchPetsByCityQuerySchema.parse(request.params);

  try {
    const getPetByIdUseCase = makeGetPetByIdUseCase();

    const result = await getPetByIdUseCase.execute({
      id,
    });

    if ("pet" in result.value) {
      return reply.status(200).send({ pet: result.value.pet });
    }
  } catch (error: any | Either<ResourceNotFoundError, { pet: Pet }>) {
    if (error.value instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    return reply.status(400).send({ message: error.message });
  }
};
