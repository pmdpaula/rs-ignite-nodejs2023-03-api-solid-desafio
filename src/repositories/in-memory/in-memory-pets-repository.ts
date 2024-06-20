import { Prisma, Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";
import {
  CreatePetParams,
  PetsRepository,
  findManyByOrgsParams,
} from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];
  public itemsPhotos: Prisma.PetPhotoUncheckedCreateInput[] = [];
  public itemsRequirements: Prisma.PetRequirementUncheckedCreateInput[] = [];
  // public itemsOrganization: Prisma.OrganizationUncheckedCreateInput[] = [];

  async create({ petData, petPhotos, petRequirements }: CreatePetParams) {
    const pet = {
      ...petData,
      id: petData.id || randomUUID(),
      created_at: new Date(), // Convert the created_at value to a Date object
      updated_at: null,
    };

    const photos = petPhotos.map((photo) => ({
      ...photo,
      // id: photorandomUUID(),
      created_at: new Date(),
      updated_at: null,
    }));

    const requirements = petRequirements.map((requirement) => ({
      ...requirement,
      // id: randomUUID(),
      created_at: new Date(),
      updated_at: null,
    }));

    this.items.push(pet);
    this.itemsPhotos.push(...photos);
    this.itemsRequirements.push(...requirements);
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findAll() {
    return this.items;
  }

  async findManyByOrgs({ orgsId }: findManyByOrgsParams) {
    const pets = this.items.filter((item) =>
      orgsId.map((id) => id).includes(item.organization_id),
    );

    return pets;
  }

  async findManyByCharacteristics({
    age,
    size,
    energyLevel,
    independenceLevel,
  }: {
    age?: string;
    size?: string;
    energyLevel?: string;
    independenceLevel?: string;
  }): Promise<Pet[]> {
    const pets = this.items
      .filter((item) => (age ? item.age === age : item))
      .filter((item) => (size ? item.size === size : item))
      .filter((item) => (energyLevel ? item.energy_level === energyLevel : item))
      .filter((item) =>
        independenceLevel ? item.independence_level === independenceLevel : item,
      );

    return pets;
  }
}
