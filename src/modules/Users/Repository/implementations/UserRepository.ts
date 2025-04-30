import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { ICreateUserDTO } from "../../DTOs/UserDTO";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/Users";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);
    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findByCpf(cpf_cnpj: string): Promise<User | null> {
    return this.repository.findOne({ where: { cpf_cnpj } });
  }
}
