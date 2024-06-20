import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcryptjs from "bcryptjs";
import { Organization } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  organization: Organization;
}

export class AuthenticateUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await bcryptjs.compare(
      password,
      organization.password_hash,
    );

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { organization };
  }
}
