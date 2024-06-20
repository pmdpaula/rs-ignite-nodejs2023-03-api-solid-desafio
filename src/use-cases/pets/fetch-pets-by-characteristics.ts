import { Either, right } from "@/core/either";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FecthPetsByCharacteristicsUseCaseRequest {
  age?: string;
  energyLevel?: string;
  size?: string;
  independenceLevel?: string;
}

type FecthPetsByCharacteristicsUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;

export class FecthPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energyLevel,
    size,
    independenceLevel,
  }: FecthPetsByCharacteristicsUseCaseRequest): Promise<FecthPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCharacteristics({
      age,
      energyLevel,
      size,
      independenceLevel,
    });

    return right({ pets });
  }
}
