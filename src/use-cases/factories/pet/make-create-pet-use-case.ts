import { CreatePetUseCase } from "../../pets/create-pet";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new CreatePetUseCase(petsRepository);

  return useCase;
}
