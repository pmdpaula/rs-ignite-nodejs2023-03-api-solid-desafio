import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetOrganizationByEmailUseCase } from "@/use-cases/factories/organization/make-get-organization-by-email";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const getByEmail = async (request: FastifyRequest, reply: FastifyReply) => {
  const getByEmailQuerySchema = z.object({
    email: z.string().email(),
  });

  const { email } = getByEmailQuerySchema.parse(request.query);

  try {
    const getOrganizationByEmailUseCase = makeGetOrganizationByEmailUseCase();

    const organization = await getOrganizationByEmailUseCase.execute({ email });

    return reply.status(200).send(organization);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
};
