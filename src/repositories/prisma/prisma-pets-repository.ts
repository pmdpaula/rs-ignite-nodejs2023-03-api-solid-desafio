import { prisma } from "@/lib/prisma";
import { Pet } from "@prisma/client";
import {
  CreatePetParams,
  FindManyByCharacteristicsParams,
  PetsRepository,
  findManyByOrgsParams,
} from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async create({ petData, petPhotos, petRequirements }: CreatePetParams) {
    await prisma.pet.create({
      data: {
        ...petData,
        PetPhotos: {
          createMany: {
            data: petPhotos.map((photo) => ({
              photo_url: photo.photo_url,
            })),
          },
        },
        PetRequirements: {
          createMany: {
            data: petRequirements.map((requirement) => ({
              description: requirement.description,
            })),
          },
        },
      },
    });
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        PetRequirements: true,
        PetPhotos: true,
      },
    });

    return pet;
  }

  async findAll() {
    const pets = await prisma.pet.findMany();

    return pets;
  }

  async findManyByOrgs({ orgsId }: findManyByOrgsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: orgsId,
        },
      },
    });

    return pets;
  }

  findManyByCharacteristics({
    age,
    size,
    energyLevel,
    independenceLevel,
  }: FindManyByCharacteristicsParams): Promise<Pet[]> {
    const pets = prisma.pet.findMany({
      where: {
        AND: [
          {
            age: age ? age : undefined,
          },
          {
            size: size ? size : undefined,
          },
          {
            energy_level: energyLevel ? energyLevel : undefined,
          },
          {
            independence_level: independenceLevel ? independenceLevel : undefined,
          },
        ],
      },
    });

    return pets;
  }
}
