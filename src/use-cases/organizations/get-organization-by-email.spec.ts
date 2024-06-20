import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { GetOrganizationByEmailUseCase } from "./get-organization-by-email";

// Unit test

// sut = System Under Test - the thing we are testing

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetOrganizationByEmailUseCase;

describe("Get Organizations by Email Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new GetOrganizationByEmailUseCase(organizationsRepository);
  });

  it("it should be able to get an organizations by email", async () => {
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
      email: "aniaml.feliz@email.com",
      password_hash: "123456",
      address: "Rua Um",
      zip_code: "223456",
      city: "Niterói",
      state: "RJ",
      phone_number: "21919999999",
    });

    const result = await sut.execute({ email: "bicho.feliz@email.com" });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.organization.email).toEqual("bicho.feliz@email.com");
    }
  });
});
