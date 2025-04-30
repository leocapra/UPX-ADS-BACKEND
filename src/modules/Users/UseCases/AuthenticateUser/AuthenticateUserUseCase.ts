import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../../Repository/IUserRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  senha: string;
  role: number;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, senha, role }: IRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas: Verifique seu E-mail", 401);
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas: Verifique sua Senha", 401);
    }

    if (user.role_id !== role) {
      throw new AppError("Credenciais inválidas", 401); 
    }

    return user;
  }
}
