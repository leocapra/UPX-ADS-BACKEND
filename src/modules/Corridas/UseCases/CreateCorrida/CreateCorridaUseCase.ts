// src/modules/corridas/useCases/CreateCorridaUseCase.ts

import { inject, injectable } from "tsyringe";
import { Corrida } from "../../entities/Corrida";
import { ICorridasRepository } from "../../Repository/ICorridasRepository";
import { IUserRepository } from "../../../Users/Repository/IUserRepository";
import { io } from "@/index";
import { AppError } from "@/errors/AppError";

interface IRequest {
  client_id: number;
  origem: {
    latitude: number;
    longitude: number;
  };
  destino: {
    latitude: number;
    longitude: number;
    nome: string;
  };
  active?: boolean;
  accept?: boolean;
  rating?: number;
  driver_id?: number;
}

@injectable()
class CreateCorridaUseCase {
  constructor(
    @inject("CorridasRepository")
    private CorridasRepository: ICorridasRepository,
    @inject("UserRepository")
    private UserRepository: IUserRepository
  ) {}

  async execute(data: IRequest): Promise<Corrida> {
    this.validateInput(data);

    const clientExists = await this.UserRepository.findById(data.client_id);
    if (!clientExists) {
      throw new AppError("Cliente não encontrado");
    }

    const activeCorrida = await this.CorridasRepository.findActiveByClientId(
      data.client_id
    );
    if (activeCorrida) {
      throw new AppError("Cliente já possui uma corrida em andamento");
    }

    const corrida = await this.CorridasRepository.create({
      client_id: data.client_id,
      origem: data.origem,
      destino: data.destino,
      active: data.active ?? true,
      accept: data.accept ?? false,
      rating: data.rating,
      driver_id: data.driver_id,
    });

    io.emit("new_ride", {
      rideId: corrida.id,
      avatar: clientExists.avatar,
      origem: data.origem,
      destino: data.destino,
      clientName: clientExists.nome,
    });

    return corrida;
  }

  private validateInput(data: IRequest): void {
    if (!data.client_id) {
      throw new AppError("client_id é obrigatório");
    }

    if (
      !data.origem ||
      typeof data.origem.latitude !== "number" ||
      typeof data.origem.longitude !== "number"
    ) {
      throw new AppError("Origem inválida");
    }

    if (
      !data.destino ||
      typeof Number(data.destino.latitude) !== "number" ||
      typeof Number(data.destino.longitude) !== "number" ||
      !data.destino.nome
    ) {
      throw new AppError("Destino inválido");
    }
  }
}

export { CreateCorridaUseCase };
