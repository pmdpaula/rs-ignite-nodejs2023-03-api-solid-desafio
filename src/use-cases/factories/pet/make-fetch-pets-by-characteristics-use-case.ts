import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FecthPetsByCharacteristicsUseCase } from "@/use-cases/pets/fetch-pets-by-characteristics";

export function makeFetchPetsByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new FecthPetsByCharacteristicsUseCase(petsRepository);

  return useCase;
}
