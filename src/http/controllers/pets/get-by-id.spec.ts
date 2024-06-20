import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { faker } from "@faker-js/faker";

describe("Fetch Pets by City (e2e)", () => {
  beforeAll(async () => {
    await app.ready();

    await request(app.server).post("/organizations").send({
      name: faker.lorem.word(),
      email: "bicho.feliz@email.com",
      password: "123456789",
      address: faker.location.streetAddress(),
      zip_code: faker.location.zipCode(),
      city: "Rio de Janeiro",
      state: "RJ",
      phone_number: faker.phone.number(),
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to gety pet by id", async () => {
    const { body: org } = await request(app.server).post("/sessions").send({
      email: "bicho.feliz@email.com",
      password: "123456789",
    });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${org.token}`)
      .send({
        name: "Pimenta",
        description: "malhado espivetado e carinhoso",
        age: "adulto",
        size: "pequeno",
        energyLevel: "alta",
        independenceLevel: "alto",
        environment: "telas nas janelas",
        organizationId: org.organization.id,
        petPhotos: [],
        petRequirements: [],
      });

    const responsePets = await request(app.server)
      .get("/pets/city")
      .set("Authorization", `Bearer ${org.token}`)
      .query({
        state: "RJ",
        city: "Rio de Janeiro",
      });

    const petId = responsePets.body.pets[0].id;

    const result = await request(app.server)
      .get(`/pets/${petId}`)
      .set("Authorization", `Bearer ${org.token}`);

    expect(result.statusCode).toEqual(200);
    expect(result.body.pet).toBeDefined;
    expect(result.body.pet.name).toEqual("Pimenta");
  });

  it("should not be able to gety pet with wrong id", async () => {
    const { body: org } = await request(app.server).post("/sessions").send({
      email: "bicho.feliz@email.com",
      password: "123456789",
    });

    const result = await request(app.server)
      .get("/pets/123")
      .set("Authorization", `Bearer ${org.token}`);

    expect(result.statusCode).toEqual(404);
  });
});
