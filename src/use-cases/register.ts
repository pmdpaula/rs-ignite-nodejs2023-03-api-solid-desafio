import { OrganizationsRepository } from "@/repositories/organizations-repository";
import bcryptjs from "bcryptjs";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error";
import { Organization } from "@prisma/client";
import { Either, left, right } from "@/core/either";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  zip_code: string;
  city: string;
  state: string;
  phone_number: string;
}

// SOLID Principles

// S - Single Responsability
// O - Open Closed
// L - Liskov Substitution
// I - Interface Segregation
// D - Dependency Inversion **

type RegisterUseCaseResponse = Either<
  OrganizationAlreadyExistsError,
  { organization: Organization }
>;

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    zip_code,
    city,
    state,
    phone_number,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcryptjs.hash(password, 6);

    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(
      email,
    );

    if (organizationWithSameEmail) {
      throw left(new OrganizationAlreadyExistsError());
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      address,
      zip_code,
      city,
      state,
      phone_number,
    });

    return right({ organization });
  }
}
