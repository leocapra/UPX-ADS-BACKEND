// src/modules/Users/UseCases/GetUserProfile/GetUserProfileUseCase.ts
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../Repository/IUserRepository";
import { User } from "../../entities/Users";

interface IResponse {
  id: number;
  nome: string;
  email: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(userId: number): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Você pode adicionar qualquer lógica adicional de negócios aqui
    // Ex: verificar se o usuário está ativo, etc.

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role_id: user.role_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
