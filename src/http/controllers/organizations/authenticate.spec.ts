import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { faker } from "@faker-js/faker";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/organizations").send({
      name: faker.lorem.word(),
      email: "bicho@email.com",
      password: "123456789",
      address: faker.location.streetAddress(),
      zip_code: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      phone_number: faker.phone.number(),
    });

    const response = await request(app.server).post("/sessions").send({
      email: "bicho@email.com",
      password: "123456789",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toEqual({
      token: expect.any(String),
      organization: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        address: expect.any(String),
        zip_code: expect.any(String),
        city: expect.any(String),
        state: expect.any(String),
        phone_number: expect.any(String),
      }),
    });
  });
});
