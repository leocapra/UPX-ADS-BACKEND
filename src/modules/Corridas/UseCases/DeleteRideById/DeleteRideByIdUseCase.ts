import { inject, injectable } from "tsyringe";
import { CorridasRepository } from "../../Repository/implementations/CorridasRepository";
import { io } from "@/index"; // Importante: isso precisa estar igual ao create
import { AppError } from "@/errors/AppError";

@injectable()
class DeleteRideByIdUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: CorridasRepository
  ) {}

  async execute(rideId: string): Promise<any> {
    const existingRide = await this.corridasRepository.findById(rideId);
    if (!existingRide) {
      throw new AppError("Corrida não encontrada");
    }

    const deleted = await this.corridasRepository.deleteRideById(rideId);

    io.emit("ride_cancelled", {
      rideId: rideId,
      clientId: existingRide.client_id,
    });

    return deleted;
  }
}

export { DeleteRideByIdUseCase };
