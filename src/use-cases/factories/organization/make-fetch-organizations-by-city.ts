import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { FecthOrganizationsByCityUseCase } from "@/use-cases/organizations/fetch-organizations-by-city";

export function makeFetchOrganizationsByCityUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new FecthOrganizationsByCityUseCase(organizationsRepository);

  return useCase;
}
