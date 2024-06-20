import { Organization, Pet, Prisma } from "@prisma/client";

export interface CreatePetParams {
  petData: Prisma.PetUncheckedCreateInput;
  petPhotos: Prisma.PetPhotoUncheckedCreateInput[];
  petRequirements: Prisma.PetRequirementUncheckedCreateInput[];
}

export interface findManyByOrgsParams {
  orgsId: Organization["id"][];
}

export interface FindManyByCharacteristicsParams {
  age?: string;
  size?: string;
  energyLevel?: string;
  independenceLevel?: string;
}

export interface PetsRepository {
  create({ petData, petPhotos, petRequirements }: CreatePetParams): Promise<void>;

  findById(id: string): Promise<Pet | null>;

  findAll(): Promise<Pet[]>;

  findManyByOrgs({ orgsId }: findManyByOrgsParams): Promise<Pet[]>;

  findManyByCharacteristics({
    age,
    size,
    energyLevel,
    independenceLevel,
  }: FindManyByCharacteristicsParams): Promise<Pet[]>;
}
