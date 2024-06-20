import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { faker } from "@faker-js/faker";

describe("Fetch Pets by City (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch pets by city", async () => {
    // const { token, organization } = await createAndAuthenticateOrganization(app);
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

    await request(app.server).post("/organizations").send({
      name: faker.lorem.word(),
      email: "animal.cuidado@email.com",
      password: "123456789",
      address: faker.location.streetAddress(),
      zip_code: faker.location.zipCode(),
      city: "Niterói",
      state: "RJ",
      phone_number: faker.phone.number(),
    });

    const { body: org1 } = await request(app.server).post("/sessions").send({
      email: "bicho.feliz@email.com",
      password: "123456789",
    });

    const { body: org2 } = await request(app.server).post("/sessions").send({
      email: "animal.cuidado@email.com",
      password: "123456789",
    });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${org1.token}`)
      .send({
        name: "Pimenta",
        description: "malhado espivetado e carinhoso",
        age: "adulto",
        size: "pequeno",
        energyLevel: "alta",
        independenceLevel: "alto",
        environment: "telas nas janelas",
        organizationId: org1.organization.id,
        petPhotos: [],
        petRequirements: [],
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${org1.token}`)
      .send({
        name: "Rabicho",
        description: "Brancão mandão e carinhoso",
        age: "adulto",
        size: "pequeno",
        energyLevel: "médio",
        independenceLevel: "alto",
        environment: "telas nas janelas",
        organizationId: org1.organization.id,
        petPhotos: [],
        petRequirements: [],
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${org1.token}`)
      .send({
        name: "Treca",
        description: "tricolor comilona, gordinha e gostosinha",
        age: "adulto",
        size: "pequeno",
        energyLevel: "baixo",
        independenceLevel: "alto",
        environment: "telas nas janelas",
        organizationId: org2.organization.id,
        petPhotos: [],
        petRequirements: [],
      });

    const response = await request(app.server)
      .get("/pets/city")
      .set("Authorization", `Bearer ${org2.token}`)
      .query({
        state: "RJ",
        city: "Rio de Janeiro",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
  });
});
