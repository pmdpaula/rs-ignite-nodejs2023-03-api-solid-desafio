import { Organization, Prisma } from "@prisma/client";

export interface FindManyByCityParams {
  state: string;
  city: string;
}

export interface OrganizationsRepository {
  create(
    organizationData: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization>;

  findAll(): Promise<Organization[]>;

  findByEmail(email: string): Promise<Organization | null>;

  findManyByCity({ state, city }: FindManyByCityParams): Promise<Organization[]>;
}
