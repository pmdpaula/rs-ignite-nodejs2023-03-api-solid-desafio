import { Prisma, Organization } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { OrganizationsRepository } from "../organizations-repository";
import { FindManyByCityParams } from "../pets-repository";
// import { Optional } from "@/core/@types/optional";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = [];

  async create(organizationData: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      ...organizationData,
      password_hash: organizationData.password_hash,
      id: randomUUID(),
      created_at: new Date(), // Convert the created_at value to a Date object
      role: organizationData.role || "MEMBER",
      updated_at: null,
    };

    this.items.push(organization);

    return organization;
  }

  async findAll() {
    return this.items;
  }

  // async findManyByCity(state: string, city: string) {
  //   let organizations = this.items.filter(
  //     (item) => item.state === state && item.city === city,
  //   );

  //   if (organizations.length === 0) {
  //     organizations = [] as Organization[];
  //   }

  //   return organizations;
  // }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email);

    return organization || null;
  }

  async findManyByCity({ state, city }: FindManyByCityParams) {
    const organizations = this.items.filter(
      (item) => item.state === state && item.city === city,
    );

    return organizations;
  }
}
