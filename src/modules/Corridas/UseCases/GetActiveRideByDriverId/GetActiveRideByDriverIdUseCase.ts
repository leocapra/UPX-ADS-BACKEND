import { inject, injectable } from "tsyringe";
import { ICorridasRepository } from "../../Repository/ICorridasRepository";

@injectable()
class GetActiveRideByDriverIdUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: ICorridasRepository
  ) {}

  async execute(data: number): Promise<any> {
    const getRidesIfExists =
      await this.corridasRepository.getActiveRideByDriverId(data);

    console.log("getActiveRideByDriverId", getRidesIfExists);

    return getRidesIfExists;
  }
}

export { GetActiveRideByDriverIdUseCase };
