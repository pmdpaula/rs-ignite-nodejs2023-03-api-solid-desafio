import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { faker } from "@faker-js/faker";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/organizations").send({
      name: faker.lorem.word(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      zip_code: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      phone_number: faker.phone.number(),
    });

    expect(response.statusCode).toEqual(201);
  });
});
