import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/utils/test/create-and-authenticate-organization";

describe("Search Pets by characteristics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets by title", async () => {
    const { token, organization } = await createAndAuthenticateOrganization(app);

    await request(app.server).post("/pets").set("Authorization", `Bearer ${token}`).send({
      name: "Pimenta",
      description: "malhado espivetado e carinhoso",
      age: "adulto",
      size: "pequeno",
      energyLevel: "alta",
      independenceLevel: "alto",
      environment: "telas nas janelas",
      organizationId: organization.id,
      petPhotos: [],
      petRequirements: [],
    });

    await request(app.server).post("/pets").set("Authorization", `Bearer ${token}`).send({
      name: "Pimenta",
      description: "malhado espivetado e carinhoso",
      age: "adulto",
      size: "pequeno",
      energyLevel: "médio",
      independenceLevel: "alto",
      environment: "telas nas janelas",
      organizationId: organization.id,
      petPhotos: [],
      petRequirements: [],
    });

    await request(app.server).post("/pets").set("Authorization", `Bearer ${token}`).send({
      name: "Pimenta",
      description: "malhado espivetado e carinhoso",
      age: "filhote",
      size: "pequeno",
      energyLevel: "médio",
      independenceLevel: "alto",
      environment: "telas nas janelas",
      organizationId: organization.id,
      petPhotos: [],
      petRequirements: [],
    });

    let response = await request(app.server)
      .get("/pets/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        age: "adulto",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);

    response = await request(app.server)
      .get("/pets/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        age: "adulto",
        energyLevel: "médio",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
  });
});
