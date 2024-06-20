import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreatePetUseCase } from "@/use-cases/factories/pet/make-create-pet-use-case";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createPetPhotosBodySchema = z
    .object({
      photo_url: z.string(),
    })
    .array();

  const createPetRequirementsBodySchema = z
    .object({
      description: z.string(),
    })
    .array();

  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    independenceLevel: z.string(),
    environment: z.string(),
    organizationId: z.string(),
    petPhotos: createPetPhotosBodySchema,
    petRequirements: createPetRequirementsBodySchema,
  });

  const {
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    organizationId,
    petPhotos,
    petRequirements,
  } = createPetBodySchema.parse(request.body);

  try {
    const createPetUseCase = makeCreatePetUseCase();

    await createPetUseCase.execute({
      name,
      description,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
      organizationId,
      petPhotos,
      petRequirements,
    });

    return reply.status(201).send();
  } catch (error) {
    // throw error;
  }
};
