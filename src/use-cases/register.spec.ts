import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";

// Unit test

// sut = System Under Test - the thing we are testing

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterUseCase(organizationsRepository);
  });

  it("it should be able to register", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "mane@qualquer.com",
      password: "123456",
      address: "Rua Qualquer",
      zip_code: "123456",
      city: "São Paulo",
      state: "SP",
      phone_number: "11999999999",
    });

    expect(result.isRight()).toBe(true);
    expect(organizationsRepository.items.length).toBe(1);
  });

  it("should hash organization password upon registration", async () => {
    await sut.execute({
      name: "John Doe",
      email: "mane@qualquer.com",
      password: "123456",
      address: "Rua Qualquer",
      zip_code: "123456",
      city: "São Paulo",
      state: "SP",
      phone_number: "11999999999",
    });

    const isPasswordCorrectly = await compare(
      "123456",
      organizationsRepository.items[0].password_hash,
    );

    expect(isPasswordCorrectly).toBe(true);
  });

  it.skip("should not be able to register with same email twice.", async () => {
    const email = "mane@qualquer.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
      address: "Rua Qualquer",
      zip_code: "123456",
      city: "São Paulo",
      state: "SP",
      phone_number: "11999999999",
    });

    const result = await sut.execute({
      name: "Joanne Doe",
      email,
      password: "1234561",
      address: "Rua Diferente",
      zip_code: "223456",
      city: "Rio de Janeiro",
      state: "RJ",
      phone_number: "21999999999",
    });

    expect(result.isLeft()).toBe(true);
  });
});
