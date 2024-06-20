import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { GetOrganizationByEmailUseCase } from "@/use-cases/organizations/get-organization-by-email";

export function makeGetOrganizationByEmailUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new GetOrganizationByEmailUseCase(organizationsRepository);

  return useCase;
}
