import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Organization } from "@prisma/client";
import { Either, right } from "@/core/either";

interface GetOrganizationByEmailUseCaseRequest {
  email: string;
}

type GetOrganizationByEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    organization: Organization;
  }
>;

export class GetOrganizationByEmailUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
  }: GetOrganizationByEmailUseCaseRequest): Promise<GetOrganizationByEmailUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    return right({ organization });
  }
}
