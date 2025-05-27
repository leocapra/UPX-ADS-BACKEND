import { inject, injectable } from "tsyringe";
import { CorridasRepository } from "../../Repository/implementations/CorridasRepository";
import { Corrida } from "../../entities/Corrida";

@injectable()
class GetRideByIdUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: CorridasRepository
  ) {}

  async execute(data: number): Promise<any> {
    const getRidesIfExists = await this.corridasRepository.getRideById(data);
    console.log("getRidesIfExists", getRidesIfExists);

    return getRidesIfExists;
  }
}

export { GetRideByIdUseCase };
