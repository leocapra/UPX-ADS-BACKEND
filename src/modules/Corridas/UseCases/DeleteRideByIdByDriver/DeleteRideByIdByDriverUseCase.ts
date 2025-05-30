import { inject, injectable } from "tsyringe";
import { CorridasRepository } from "../../Repository/implementations/CorridasRepository";
import { io } from "@/index";
import { AppError } from "@/errors/AppError";

@injectable()
class DeleteRideByIdByDriverUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: CorridasRepository
  ) {}

  async execute(rideId: string): Promise<any> {
    const existingRide = await this.corridasRepository.findById(rideId);
    if (!existingRide) {
      throw new AppError("Corrida não encontrada");
    }

    if (existingRide.accept === true) {
      existingRide.active = false;
      existingRide.accept = false;
      existingRide.cancelled = true;
      const updatedRide = await this.corridasRepository.save(existingRide);

      io.emit("ride_cancelled_by_driver", {
        rideId: rideId,
        clientId: existingRide.client_id,
      });

      return updatedRide;
    }

    const deleted = await this.corridasRepository.deleteRideById(rideId);

    io.emit("ride_cancelled_by_driver", {
      rideId: rideId,
      clientId: existingRide.client_id,
    });

    return deleted;
  }
}

export { DeleteRideByIdByDriverUseCase };
