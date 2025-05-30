import { inject, injectable } from "tsyringe";
import { io } from "@/index";
import { ICorridasRepository } from "../../Repository/ICorridasRepository";
import { IUserRepository } from "@/modules/Users/Repository/IUserRepository";

@injectable()
class FinishRideByIdUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: ICorridasRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(clientId: string): Promise<any> {
    console.log("clientId", clientId);
    let rides;
    rides = await this.corridasRepository.getRidePendingActiveById(clientId);

    const ride = rides[0];
    console.log("ride", ride);

    ride.accept = false;
    ride.active = false;

    const updatedRide = await this.corridasRepository.save(ride);
    const newRides = await this.corridasRepository.getRideByMyId(ride.id);
    const updatedRides = newRides[0];
    const driver = await this.userRepository.findById(
      Number(updatedRides.driver_id)
    );

    io.emit("finish_ride", {
      accept: true,
      rideId: ride.id,
      clientId: updatedRides.client_id,
      driverId: updatedRides.driver_id,
      driver_nome: driver?.nome,
      driver_sobrenome: driver?.sobre_nome,
      telefone: driver?.telefone,
      placa: driver?.placa,
      cor_veiculo: driver?.cor_veiculo,
      avatar: driver?.avatar,
      veiculo: driver?.veiculo,
    });

    return {
      ...updatedRide,
      message: "Corrida finalizada com sucesso",
    };
  }
}

export { FinishRideByIdUseCase };
