import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";

describe("Get Organization By Email (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get an organization by email", async () => {
    await request(app.server).post("/organizations").send({
      name: faker.lorem.word(),
      email: "bicho@email.com",
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      zip_code: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      phone_number: faker.phone.number(),
    });

    const response = await request(app.server).get("/organizations/email").query({
      email: "bicho@email.com",
    });

    expect(response.statusCode).toEqual(200);
    // expect(response.body).toMatchObject({
    //   name: expect.any(String),
    //   email: "bicho@email.com",
    //   address: expect.any(String),
    //   zip_code: expect.any(String),
    //   city: expect.any(String),
    //   state: expect.any(String),
    //   phone_number: expect.any(String),
    // });
  });
});
