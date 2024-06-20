import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { OrganizationAlreadyExistsError } from "@/use-cases/errors/organization-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/organization/make-register-use-case";

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    zip_code: z.string(),
    city: z.string(),
    state: z.string(),
    phone_number: z.string(),
  });

  const { name, email, password, address, zip_code, city, state, phone_number } =
    registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      zip_code,
      city,
      state,
      phone_number,
    });
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
};
