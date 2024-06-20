import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/utils/test/create-and-authenticate-organization";
import { faker } from "@faker-js/faker";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { token, organization } = await createAndAuthenticateOrganization(app);

    const petPhotos = [
      {
        photo_url: faker.internet.url(),
      },
      {
        photo_url: faker.internet.url(),
      },
    ];

    const petRequirements = [
      {
        description: faker.lorem.words(),
      },
    ];

    const result = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pimenta",
        description: "malhado espivetado e carinhoso",
        age: "adulto",
        size: "pequeno",
        energyLevel: "alta",
        independenceLevel: "alto",
        environment: "telas nas janelas",
        organizationId: organization.id,
        petPhotos,
        petRequirements,
      });

    expect(result.statusCode).toEqual(201);
  });
});
