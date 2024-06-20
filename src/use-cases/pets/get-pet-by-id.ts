import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";

interface GetPetByIdUseCaseRequest {
  id: string;
}

type GetPetByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    pet: Pet;
  }
>;

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw left(new ResourceNotFoundError());
    }

    return right({ pet });
  }
}
