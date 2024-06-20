import { Either, right } from "@/core/either";
import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { Organization } from "@prisma/client";

interface FecthOrganizationsByCityUseCaseRequest {
  state: string;
  city: string;
}

type FecthOrganizationsByCityUseCaseResponse = Either<
  null,
  {
    organizations: Organization[];
  }
>;

export class FecthOrganizationsByCityUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    state,
    city,
  }: FecthOrganizationsByCityUseCaseRequest): Promise<FecthOrganizationsByCityUseCaseResponse> {
    const organizations = await this.organizationsRepository.findManyByCity({
      state,
      city,
    });

    return right({ organizations });
  }
}
