import { Either, right } from "@/core/either";
import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FecthPetsByCityUseCaseRequest {
  state: string;
  city: string;
}

type FecthPetsByCityUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;

export class FecthPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    state,
    city,
  }: FecthPetsByCityUseCaseRequest): Promise<FecthPetsByCityUseCaseResponse> {
    const organizationsInACity = await this.organizationsRepository.findManyByCity({
      state,
      city,
    });
    const orgsId = organizationsInACity.map((org) => org.id);

    const pets = await this.petsRepository.findManyByOrgs({ orgsId });

    return right({ pets });
  }
}
