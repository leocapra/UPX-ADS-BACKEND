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
      and a.active = true
      `);
  }

  async getRideById(client_id: number): Promise<Corrida[]> {
    return this.repository.query(`
        select * from corridas
        where client_id = ${client_id}
        and active = true
      `);
  }

  async getRideHistoryByIdStudent(client_id: number): Promise<Corrida[]> {
    return this.repository.query(`
      SELECT
    c.*,
    u.id as driver_user_id,
    u.nome as driver_nome,
    u.sobre_nome as driver_sobrenome,
    u.email as driver_email,
    u.telefone as driver_telefone,
    u.cor_veiculo as driver_collor,
    u.placa as driver_placa,
    u.veiculo as driver
    FROM corridas c
    LEFT JOIN users u ON c.driver_id = u.id
    WHERE c.client_id = ${client_id}
      AND c.active = false
    ORDER BY c.created_at DESC;
        `);
  }

  async getRideHistoryByIdDriver(client_id: number): Promise<Corrida[]> {
    return this.repository.query(`
      SELECT
          c.*,
          u.id as student_user_id,
          u.nome as student_nome,
          u.sobre_nome as student_sobrenome,
          u.email as student_email,
          u.telefone as student_telefone,
          u.universidade as student_universidade,
          u.curso as student_curso
        FROM corridas c
        LEFT JOIN users u ON c.client_id = u.id
        WHERE c.driver_id = ${client_id}
        AND c.active = false
        ORDER BY c.created_at DESC;
        `);
  }

  async getActiveRideByDriverId(client_id: number): Promise<Corrida[]> {
    return this.repository.query(`
      SELECT
          c.*,
          u.id as student_user_id,
          u.nome as student_nome,
          u.sobre_nome as student_sobrenome,
          u.email as student_email,
          u.telefone as student_telefone,
          u.universidade as student_universidade,
          u.curso as student_curso
        FROM corridas c
        LEFT JOIN users u ON c.client_id = u.id
        WHERE c.driver_id = ${client_id}
        AND c.active = true
        `);
  }

  async getRideByMyId(id: string): Promise<Corrida[]> {
    return this.repository.query(`
        SELECT
        c.*,
        cli.id AS client_id,
        cli.nome AS client_nome,
        cli.sobre_nome AS client_sobrenome,
        cli.email AS client_email,
        cli.telefone AS client_telefone,
        cli.cpf_cnpj AS client_cpf,
        cli.universidade AS client_universidade,
        cli.curso AS client_curso,
        mot.id AS driver_id,
        mot.nome AS driver_nome,
        mot.sobre_nome AS driver_sobrenome,
        mot.email AS driver_email,
        mot.telefone AS driver_telefone,
        mot.cpf_cnpj AS driver_cpf,
        mot.placa AS driver_placa,
        mot.veiculo AS driver_veiculo,
        mot.cor_veiculo AS driver_cor_veiculo,
        mot.ano_veiculo AS driver_ano_veiculo,
        mot.numero_cnh AS driver_cnh
        FROM corridas c
        left JOIN users cli ON c.client_id = cli.id
        LEFT JOIN users mot ON c.driver_id = mot.id
        WHERE c.id = '${id}'
      `);
  }

  async deleteRideById(id: string): Promise<any> {
    return this.repository.query(`
      delete from corridas where id = '${id}'
      `);
  }

  async getRidePendingByClientId(client_id: number): Promise<Corrida[]> {
    return this.repository.query(`
    SELECT
    c.*,
    cli.id AS client_id,
    cli.nome AS client_nome,
    cli.sobre_nome AS client_sobrenome,
    cli.email AS client_email,
    cli.telefone AS client_telefone,
    cli.cpf_cnpj AS client_cpf,
    cli.universidade AS client_universidade,
    cli.curso AS client_curso,
    mot.id AS driver_id,
    mot.nome AS driver_nome,
    mot.sobre_nome AS driver_sobrenome,
    mot.email AS driver_email,
    mot.telefone AS driver_telefone,
    mot.cpf_cnpj AS driver_cpf,
    mot.placa AS driver_placa,
    mot.veiculo AS driver_veiculo,
    mot.cor_veiculo AS driver_cor_veiculo,
    mot.ano_veiculo AS driver_ano_veiculo,
    mot.numero_cnh AS driver_cnh
    FROM corridas c
    left JOIN users cli ON c.client_id = cli.id
    LEFT JOIN users mot ON c.driver_id = mot.id
    WHERE c.client_id = ${client_id}
    AND c.active = true
    AND c.accept = false;
      `);
  }
  async getRidePendingById(id: string): Promise<Corrida[]> {
    return this.repository.query(`
    SELECT
    c.*,
    cli.id AS client_id,
    cli.nome AS client_nome,
    cli.sobre_nome AS client_sobrenome,
    cli.email AS client_email,
    cli.telefone AS client_telefone,
    cli.cpf_cnpj AS client_cpf,
    cli.universidade AS client_universidade,
    cli.curso AS client_curso,
    mot.id AS driver_id,
    mot.nome AS driver_nome,
    mot.sobre_nome AS driver_sobrenome,
    mot.email AS driver_email,
    mot.telefone AS driver_telefone,
    mot.cpf_cnpj AS driver_cpf,
    mot.placa AS driver_placa,
    mot.veiculo AS driver_veiculo,
    mot.cor_veiculo AS driver_cor_veiculo,
    mot.ano_veiculo AS driver_ano_veiculo,
    mot.numero_cnh AS driver_cnh
    FROM corridas c
    left JOIN users cli ON c.client_id = cli.id
    LEFT JOIN users mot ON c.driver_id = mot.id
    WHERE c.id = '${id}'
    AND c.active = true
    AND c.accept = false;
      `);
  }
}

export { CorridasRepository };
