// src/modules/corridas/repositories/ICorridasRepository.ts

import { ICreateCorridaDTO } from "../DTOs/CorridaDTO";
import { Corrida } from "../entities/Corrida";

export interface ICorridasRepository {
  create(data: ICreateCorridaDTO): Promise<Corrida>;
  findById(id: string): Promise<Corrida | null>;
  findByClientId(client_id: number): Promise<Corrida[]>;
  findByDriverId(driver_id: number): Promise<Corrida[]>;
  findActiveByClientId(client_id: number): Promise<Corrida | null>;
  findPending(): Promise<Corrida[]>;
  acceptCorrida(id: string, driver_id: number): Promise<Corrida>;
  finishCorrida(id: string): Promise<Corrida>;
  rateCorrida(id: string, rating: number): Promise<Corrida>;
  save(corrida: Corrida): Promise<Corrida>;
  getRideByNotAccept(): Promise<Corrida[]>;
  getRideById(client_id: number): Promise<Corrida[]>;
  deleteRideById(id: string): Promise<any>;
  getRidePendingByClientId(client_id: number): Promise<Corrida[]>;
  getRidePendingById(id: string): Promise<Corrida[]>
  getRideByMyId(id: string): Promise<Corrida[]>
}
