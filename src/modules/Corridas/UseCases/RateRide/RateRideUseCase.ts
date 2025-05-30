import { inject, injectable } from "tsyringe";
import { ICorridasRepository } from "../../Repository/ICorridasRepository";

@injectable()
class RateRideUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: ICorridasRepository
  ) {}

  async execute(rideId: string, rating: number): Promise<any> {
    let rides;

    rides = await this.corridasRepository.getRide(rideId);

    if (!rides?.length) {
      throw new Error(
        "Nenhuma corrida pendente encontrada para o identificador fornecido."
      );
    }
    const ride = rides[0];
    ride.rating = rating;
    const updatedRide = await this.corridasRepository.save(ride);

    return {
      ...updatedRide,
      message: "Corrida avaliada com sucesso",
    };
  }
}

export { RateRideUseCase };
