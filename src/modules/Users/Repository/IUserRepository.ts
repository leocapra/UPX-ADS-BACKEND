// src/modules/Users/repositories/IUserRepository.ts
import { ICreateUserDTO } from "../DTOs/UserDTO";
import { User } from "../entities/Users";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf_cnpj: string): Promise<User | null>;
}
