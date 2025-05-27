// src/modules/corridas/repositories/implementations/CorridasRepository.ts
import { Repository } from "typeorm";
import { ICorridasRepository } from "../ICorridasRepository";
import { Corrida } from "../../entities/Corrida";
import { ICreateCorridaDTO } from "../../DTOs/CorridaDTO";
import { AppDataSource } from "@/data-source";

class CorridasRepository implements ICorridasRepository {
  private repository: Repository<Corrida>;

  constructor() {
    this.repository = AppDataSource.getRepository(Corrida);
  }

  async create(data: ICreateCorridaDTO): Promise<Corrida> {
    const corrida = this.repository.create(data);
    await this.repository.save(corrida);
    return corrida;
  }

  async findById(id: string): Promise<Corrida | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByClientId(client_id: number): Promise<Corrida[]> {
    return this.repository.find({
      where: { client_id },
      relations: ["driver"],
    });
  }

  async findByDriverId(driver_id: number): Promise<Corrida[]> {
    return this.repository.find({
      where: { driver_id },
      relations: ["client"],
    });
  }

  async findActiveByClientId(client_id: number): Promise<Corrida | null> {
    return this.repository.findOne({
      where: { client_id, active: true },
      relations: ["driver"],
    });
  }

  async findPending(): Promise<Corrida[]> {
    return this.repository.find({
      where: { accept: false, active: true },
      relations: ["client"],
    });
  }

  async acceptCorrida(id: string, driver_id: number): Promise<Corrida> {
    await this.repository.update(id, { driver_id, accept: true });
    const corrida = await this.repository.findOne({ where: { id } });
    if (!corrida) throw new Error("Corrida não encontrada");
    return corrida;
  }

  async finishCorrida(id: string): Promise<Corrida> {
    await this.repository.update(id, { active: false });
    const corrida = await this.repository.findOne({ where: { id } });
    if (!corrida) throw new Error("Corrida não encontrada");
    return corrida;
  }

  async rateCorrida(id: string, rating: number): Promise<Corrida> {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating deve ser entre 1 e 5");
    }
    await this.repository.update(id, { rating });
    const corrida = await this.repository.findOne({ where: { id } });
    if (!corrida) throw new Error("Corrida não encontrada");
    return corrida;
  }

  async save(corrida: Corrida): Promise<Corrida> {
    return this.repository.save(corrida);
  }

  async getRideByNotAccept(): Promise<Corrida[]> {
    return this.repository.query(`
      select * from corridas a
      join users u on a.client_id = u.id
      where a.accept = false
      `);
  }

  async getRideById(client_id: number): Promise<Corrida[]> {
    return this.repository.query(`
        select * from corridas
        where client_id = ${client_id}
        and active = true
      `);
  }

  async deleteRideById(id: string): Promise<any> {
    return this.repository.query(`
      delete from corridas where id = '${id}'
      `);
  }
}

export { CorridasRepository };
