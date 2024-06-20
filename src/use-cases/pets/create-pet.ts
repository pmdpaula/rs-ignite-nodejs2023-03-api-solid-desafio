import { Pet, PetPhoto, PetRequirement, Prisma } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Either, right } from "@/core/either";
import { Optional } from "@/core/types/optional";
import { randomUUID } from "node:crypto";

export interface CreatePetUseCaseRequest {
  id?: string;
  name: string;
  description: string;
  age: string;
  size: string;
  energyLevel: string;
  independenceLevel: string;
  environment: string;
  organizationId: string;
  petPhotos: Optional<PetPhoto, "id" | "pet_id">[];
  petRequirements: Optional<PetRequirement, "id" | "pet_id">[];
}

type CreatePetUseCaseResponse = Either<null, { pet: Pet }>;

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    organizationId,
    petPhotos,
    petRequirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const petData: Prisma.PetUncheckedCreateInput = {
      id: id ? new UniqueEntityID(id).toString() : randomUUID().toString(),
      name,
      description,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      environment,
      organization_id: new UniqueEntityID(organizationId).toString(),
    };

    const newPetPhotos = petPhotos.map((photo) => {
      return {
        id: new UniqueEntityID().toString(),
        pet_id: petData.id as string,
        ...photo,
      };
    });

    const newPetRequirements = petRequirements.map((requirement) => {
      return {
        id: new UniqueEntityID().toString(),
        pet_id: petData.id as string,
        ...requirement,
      };
    });

    await this.petsRepository.create({
      petData,
      petPhotos: newPetPhotos,
      petRequirements: newPetRequirements,
    });

    return right({ pet: petData as Pet });
  }
}
