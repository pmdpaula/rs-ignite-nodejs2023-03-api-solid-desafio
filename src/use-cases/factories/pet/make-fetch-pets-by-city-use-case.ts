import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FecthPetsByCityUseCase } from "@/use-cases/pets/fetch-pets-by-city";

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const organizationRepository = new PrismaOrganizationsRepository();
  const useCase = new FecthPetsByCityUseCase(petsRepository, organizationRepository);

  return useCase;
}
