import { inject, injectable } from "tsyringe";
import { ICorridasRepository } from "../../Repository/ICorridasRepository";

@injectable()
class GetRideHistoryByIdDriverUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: ICorridasRepository
  ) {}

  async execute(data: number): Promise<any> {
    const getRidesIfExists =
      await this.corridasRepository.getRideHistoryByIdDriver(data);

    console.log("getRideHistoryByIdDriver", getRidesIfExists);

    return getRidesIfExists;
  }
}

export { GetRideHistoryByIdDriverUseCase };
