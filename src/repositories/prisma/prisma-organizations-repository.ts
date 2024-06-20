import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { FindManyByCityParams } from "../pets-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(organizationData: Prisma.OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({
      data: organizationData,
    });

    return organization;
  }

  async findAll() {
    const organizations = await prisma.organization.findMany();

    return organizations;
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    });

    return organization;
  }

  async findManyByCity({ state, city }: FindManyByCityParams) {
    const organizations = await prisma.organization.findMany({
      where: {
        city,
        state,
      },
    });

    return organizations;
  }
}
