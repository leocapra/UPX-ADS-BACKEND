import { inject, injectable } from "tsyringe";
import { CorridasRepository } from "../../Repository/implementations/CorridasRepository";
import { Corrida } from "../../entities/Corrida";

@injectable()
class GetRideByIdToRatingUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: CorridasRepository
  ) {}

  async execute(data: number): Promise<any> {
    const getRidesIfExists = await this.corridasRepository.getRideByIdToRating(
      data
    );
    return getRidesIfExists;
  }
}

export { GetRideByIdToRatingUseCase };
