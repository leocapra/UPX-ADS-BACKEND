// src/modules/Users/UseCases/UpdateUser/UpdateUserUseCase.ts
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../Repository/IUserRepository";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/Users";

interface IRequest {
  userId: number;
  email: string;
  universidade: string;
  curso: string;
  telefone: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    userId,
    email,
    universidade,
    curso,
    telefone,
  }: IRequest): Promise<User> {
    if (!userId) {
      throw new AppError("Usuário não autenticado", 401);
    }

    if (!email.includes("@")) {
      throw new AppError("Email inválido", 400);
    }

    if (telefone && telefone.replace(/\D/g, "").length < 10) {
      throw new AppError("Telefone inválido", 400);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    user.email = email;
    user.universidade = universidade;
    user.curso = curso; 
    user.telefone = telefone;

    return this.userRepository.save(user);
  }
}
