import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreatePetUseCase } from "./create-pet";
import { faker } from "@faker-js/faker";

// Unit test

// sut = System Under Test - the thing we are testing

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("it should be able to create pet", async () => {
    const petPhotos = [
      {
        photo_url: faker.internet.url(),
      },
    ];

    const petRequirements = [
      {
        description: faker.lorem.words(),
      },
    ];

    const result = await sut.execute({
      name: "Pimenta",
      description: "malhado espivetado e carinhoso",
      age: "adulto",
      size: "pequeno",
      energyLevel: "alta",
      independenceLevel: "alto",
      environment: "telas nas janelas",
      organizationId: "organization-id",
      petPhotos,
      petRequirements,
    });

    const pets = await petsRepository.findAll();

    expect(result.value?.pet.name).toEqual("Pimenta");
    expect(pets.length).toEqual(1);
  });
});
