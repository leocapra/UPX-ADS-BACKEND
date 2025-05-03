// src/modules/Users/UseCases/UpdateUser/UpdateUserUseCase.ts
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../Repository/IUserRepository";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/Users";

interface IRequest {
  userId: number;
  email: string;
  universidade?: string;
  curso?: string;
  telefone?: string;
  ano_veiculo?: number;
  cor_veiculo?: string;
  veiculo?: string;
  placa?: string;
  numero_cnh?: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  private validateStringNotBlank(fieldName: string, value: string): void {
    if (value.trim() === "") {
      throw new AppError(
        `O campo ${fieldName} não pode ser uma string vazia`,
        400
      );
    }
  }

  async execute({
    userId,
    email,
    universidade,
    curso,
    telefone,
    ano_veiculo,
    cor_veiculo,
    veiculo,
    placa,
    numero_cnh,
  }: IRequest): Promise<User> {
    // Validação do usuário
    if (!userId) {
      throw new AppError("Usuário não autenticado", 401);
    }

    // Validação estrita do email (obrigatório e formatado)
    if (email === null || email === undefined || email.trim() === "") {
      throw new AppError("O campo email é obrigatório", 400);
    }
    this.validateStringNotBlank("email", email);
    if (!email.includes("@")) {
      throw new AppError("Email inválido", 400);
    }

    // Validação dos demais campos (pode ser null, mas não string vazia)
    if (telefone !== null && telefone !== undefined) {
      this.validateStringNotBlank("telefone", telefone);
      if (telefone.replace(/\D/g, "").length < 10) {
        throw new AppError("Telefone inválido", 400);
      }
    }

    // Validação genérica para outros campos string
    const stringFields = {
      universidade,
      curso,
      cor_veiculo,
      veiculo,
      placa,
      numero_cnh,
    };

    Object.entries(stringFields).forEach(([field, value]) => {
      if (value !== null && value !== undefined) {
        this.validateStringNotBlank(field, value);
      }
    });

    // Busca e atualização do usuário
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Atualiza os campos (email sempre é atualizado)
    user.email = email;

    // Atualiza apenas os campos que não são undefined
    if (telefone !== undefined) user.telefone = telefone;
    if (universidade !== undefined) user.universidade = universidade;
    if (curso !== undefined) user.curso = curso;
    if (ano_veiculo !== undefined) user.ano_veiculo = ano_veiculo;
    if (cor_veiculo !== undefined) user.cor_veiculo = cor_veiculo;
    if (veiculo !== undefined) user.veiculo = veiculo;
    if (placa !== undefined) user.placa = placa;
    if (numero_cnh !== undefined) user.numero_cnh = numero_cnh;

    return this.userRepository.save(user);
  }
}
