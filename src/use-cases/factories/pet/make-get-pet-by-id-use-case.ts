import { GetPetByIdUseCase } from "../../pets/get-pet-by-id";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeGetPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetPetByIdUseCase(petsRepository);

  return useCase;
}
