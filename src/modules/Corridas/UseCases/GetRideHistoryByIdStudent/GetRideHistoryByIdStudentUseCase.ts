import { inject, injectable } from "tsyringe";
import { ICorridasRepository } from "../../Repository/ICorridasRepository";

@injectable()
class GetRideHistoryByIdStudentUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: ICorridasRepository
  ) {}

  async execute(data: number): Promise<any> {
    const getRidesIfExists =
      await this.corridasRepository.getRideHistoryByIdStudent(data);

    console.log("getRideHistoryByIdStudent", getRidesIfExists);

    return getRidesIfExists;
  }
}

export { GetRideHistoryByIdStudentUseCase };
