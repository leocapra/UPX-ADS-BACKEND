import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../Repository/IUserRepository";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/Users";
import { AddToSetOperators } from "typeorm";

interface IRequest {
  email: string;
  senha: string;
  role: number;
}

interface IResponse {
  user: {
    id: number;
    nome: string;
    email: string;
    role_id: number;
    telefone: string;
    universidade: string;
    curso: string;
    placa: string;
    cor_veiculo: string;
    ano_veiculo: number;
    numero_cnh: string;
    veiculo: string;
    avatar: string;

  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, senha, role }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    console.log('user', user)

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

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET || "default_secret",
      {
        subject: String(user.id),
        expiresIn: "1d",
      }
    );

    return {
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role_id: user.role_id,
        telefone: user.telefone,
        universidade: user.universidade,
        curso: user.curso,
        placa: user.placa,
        cor_veiculo: user.cor_veiculo,
        veiculo: user.veiculo,
        ano_veiculo: user.ano_veiculo,
        numero_cnh: user.numero_cnh,
        avatar: user.avatar,
      },
      token,
    };
  }
}
