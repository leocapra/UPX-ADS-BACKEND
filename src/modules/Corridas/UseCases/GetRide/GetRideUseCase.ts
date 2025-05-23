import { inject, injectable } from "tsyringe";
import { CorridasRepository } from "../../Repository/implementations/CorridasRepository";
import { Corrida } from "../../entities/Corrida";

@injectable()
class GetRideUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: CorridasRepository
  ) {}

  async execute(): Promise<Corrida[]> {
    const getRides = await this.corridasRepository.getRideByNotAccept()
    console.log('getRides', getRides)

    return getRides
  }
}

export { GetRideUseCase };
