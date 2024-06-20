import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { FecthPetsByCharacteristicsUseCase } from "./fetch-pets-by-characteristics";
import { beforeEach, describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: FecthPetsByCharacteristicsUseCase;

describe("Fetch Pets by Characteristics Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new FecthPetsByCharacteristicsUseCase(petsRepository);
  });

  it("it should be able to fetch pets by characteristics", async () => {
    await organizationsRepository.create({
      name: faker.company.buzzNoun(),
      email: "bicho.feliz@email.com",
      password_hash: "123456",
      address: faker.location.streetAddress(),
      zip_code: faker.location.zipCode(),
      city: "Rio de Janeiro",
      state: "RJ",
      phone_number: faker.phone.number(),
    });

    const org = await organizationsRepository.findByEmail("bicho.feliz@email.com");

    let petData = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      environment: "interior",
      age: "adulto",
      energy_level: "alto",
      size: "grande",
      independence_level: "alto",
      organization_id: org?.id || "id-org",
    };

    await petsRepository.create({ petData, petPhotos: [], petRequirements: [] });

    petData = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      environment: "interior",
      age: "filhote",
      energy_level: "médio",
      size: "pequeno",
      independence_level: "alto",
      organization_id: org?.id || "id-org",
    };

    await petsRepository.create({ petData, petPhotos: [], petRequirements: [] });

    petData = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      environment: "interior",
      age: "adulto",
      energy_level: "médio",
      size: "pequeno",
      independence_level: "alto",
      organization_id: org?.id || "id-org",
    };

    await petsRepository.create({ petData, petPhotos: [], petRequirements: [] });

    let response = await sut.execute({
      age: "adulto",
    });

    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value.pets.length).toBe(2);
      expect(response.value.pets[0].age).toBe("adulto");
    }

    response = await sut.execute({
      age: "adulto",
      size: "grande",
    });

    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value.pets.length).toBe(1);
      expect(response.value.pets[0].size).toBe("grande");
    }
  });
});
