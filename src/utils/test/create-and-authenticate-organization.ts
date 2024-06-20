import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export const createAndAuthenticateOrganization = async (app: FastifyInstance) => {
  const password_hash = await bcryptjs.hash("123456789", 6);

  await prisma.organization.create({
    data: {
      name: faker.lorem.word(),
      email: "bicho@email.com",
      password_hash,
      address: faker.location.streetAddress(),
      zip_code: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      phone_number: faker.phone.number(),
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "bicho@email.com",
    password: "123456789",
  });
  // console.log("🚀 ~ authResponse ~ authResponse:", authResponse.body);

  const { token, organization } = authResponse.body;

  return { token, organization };
};
