import { inject, injectable } from "tsyringe";
import { io } from "@/index";
import { ICorridasRepository } from "../../Repository/ICorridasRepository";
import { IUserRepository } from "@/modules/Users/Repository/IUserRepository";

@injectable()
class UpdateAcceptRideByClientIdUseCase {
  constructor(
    @inject("CorridasRepository")
    private corridasRepository: ICorridasRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  private isUUID(value: string): boolean {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      value
    );
  }

  async execute(clientId: string | number, driverId: number): Promise<any> {
    let rides;

    if (typeof clientId === "string" && this.isUUID(clientId)) {
      rides = await this.corridasRepository.getRidePendingById(clientId);
    } else if (!isNaN(Number(clientId))) {
      rides = await this.corridasRepository.getRidePendingByClientId(
        Number(clientId)
      );
    } else {
      throw new Error(
        "Identificador inválido. Forneça um UUID válido ou ID numérico."
      );
    }

    if (!rides?.length) {
      throw new Error(
        "Nenhuma corrida pendente encontrada para o identificador fornecido."
      );
    }

    const ride = rides[0];

    ride.accept = true;
    ride.driver_id = driverId;

    const updatedRide = await this.corridasRepository.save(ride);
    const newRides = await this.corridasRepository.getRideByMyId(ride.id);
    const updatedRides = newRides[0]
    const driver = await this.userRepository.findById(Number(updatedRides.driver_id))
    console.log("driver", driver)


    io.emit("accept_ride", {
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
      message: "Corrida aceita com sucesso",
    };
  }
}

export { UpdateAcceptRideByClientIdUseCase };
