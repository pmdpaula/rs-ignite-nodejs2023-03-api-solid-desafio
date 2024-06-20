import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { GetPetByIdUseCase } from "./get-pet-by-id";

// Unit test

// sut = System Under Test - the thing we are testing

let petsRepository: InMemoryPetsRepository;
let sut: GetPetByIdUseCase;

describe("Get Pet by Id Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetByIdUseCase(petsRepository);
  });

  it("it should be able to get a pet by id", async () => {
    await petsRepository.create({
      petData: {
        name: "Pimenta",
        description: "malhado espivetado e carinhoso",
        age: "adulto",
        size: "pequeno",
        energy_level: "alta",
        independence_level: "alto",
        environment: "telas nas janelas",
        organization_id: "organization-id",
      },
      petPhotos: [],
      petRequirements: [],
    });

    const pets = await petsRepository.findAll();
    const result = await sut.execute({ id: pets[0].id });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value?.pet.name).toEqual("Pimenta");
    }
  });

  it.skip("it should not be able to get a pet with a wrong id", async () => {
    const result = await sut.execute({ id: "wrong-id" });

    expect(result.isLeft()).toBe(true);
  });
});
