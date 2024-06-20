import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { FecthPetsByCityUseCase } from "./fetch-pets-by-city";
import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { randomUUID } from "crypto";

// Unit test

// sut = System Under Test - the thing we are testing

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: FecthPetsByCityUseCase;

describe("Fetch Pets by City Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new FecthPetsByCityUseCase(petsRepository, organizationsRepository);
  });

  it("it should be able to fetch pets by city", async () => {
    await organizationsRepository.create({
      name: "Bicho Feliz",
      email: "bicho.feliz@email.com",
      password_hash: "123456",
      address: "Rua Qualquer",
      zip_code: "123456",
      city: "Rio de Janeiro",
      state: "RJ",
      phone_number: "21999999999",
    });

    await organizationsRepository.create({
      name: "Animal Feliz",
      email: "animal.feliz@email.com",
      password_hash: "123456",
      address: "Rua Um",
      zip_code: "223456",
      city: "Niterói",
      state: "RJ",
      phone_number: "21919999999",
    });

    const organization1 = await organizationsRepository.findByEmail(
      "bicho.feliz@email.com",
    );

    const organization2 = await organizationsRepository.findByEmail(
      "animal.feliz@email.com",
    );

    // const orgs = await organizationsRepository.findAll();
    // console.log("🚀 ~ it ~ orgs:", orgs);

    const petId = new UniqueEntityID(randomUUID()).toString();

    const petPhotos = [
      {
        pet_id: petId,
        photo_url: faker.internet.url(),
      },
    ];

    const petRequirements = [
      {
        pet_id: petId,
        description: faker.lorem.words(),
      },
    ];

    await petsRepository.create({
      petData: {
        id: petId,
        name: "Pimenta",
        description: "malhado espivetado e carinhoso",
        age: "adulto",
        size: "pequeno",
        energy_level: "alta",
        independence_level: "alto",
        environment: "telas nas janelas",
        organization_id: organization1?.id as string,
      },
      petPhotos,
      petRequirements,
    });

    const petId2 = new UniqueEntityID(randomUUID()).toString();

    const petPhotos2 = [
      {
        pet_id: petId2,
        photo_url: faker.internet.url(),
      },
    ];

    const petRequirements2 = [
      {
        pet_id: petId2,
        description: faker.lorem.words(),
      },
    ];

    await petsRepository.create({
      petData: {
        id: petId2,
        name: "Treca",
        description: "tricolor gordinha e gostosinha",
        age: "adulto",
        size: "pequeno",
        energy_level: "baixo",
        independence_level: "alto",
        environment: "telas nas janelas",
        organization_id: organization2?.id as string,
      },
      petPhotos: petPhotos2,
      petRequirements: petRequirements2,
    });

    const result = await sut.execute({ state: "RJ", city: "Niterói" });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.pets.length).toBe(1);
    }
  });
});
