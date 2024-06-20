import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

// Unit test

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);
  });

  it("it should be able to authenticate", async () => {
    await organizationsRepository.create({
      name: "John Doe",
      email: "mane@qualquer.com",
      password_hash: await hash("123456", 6),
      address: "Rua Qualquer",
      zip_code: "123456",
      city: "São Paulo",
      state: "SP",
      phone_number: "11999999999",
    });

    const { organization } = await sut.execute({
      email: "mane@qualquer.com",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("it should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "nao@existe.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("it should not be able to authenticate with wrong password", async () => {
    await organizationsRepository.create({
      name: "John Doe",
      email: "mane@qualquer.com",
      password_hash: await hash("123456", 6),
      address: "Rua Qualquer",
      zip_code: "123456",
      city: "São Paulo",
      state: "SP",
      phone_number: "11999999999",
    });

    await expect(() =>
      sut.execute({
        email: "mane@qualquer.com",
        password: "1234",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
