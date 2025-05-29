import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../Repository/IUserRepository";
import { ICreateUserDTO } from "../../DTOs/UserDTO";
import { User } from "../../entities/Users";
import { AppError } from "../../../../errors/AppError";
import bcrypt from "bcryptjs";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new AppError("Email já cadastrado!", 409);
    }

    const cpfExists = await this.userRepository.findByCpf(data.cpf_cnpj);
    if (cpfExists) {
      throw new AppError("CPF/CNPJ já cadastrado!", 409);
    }

    if (data.role_id === 3) {
      if (!data.placa || !data.numero_cnh) {
        throw new AppError("Motoristas devem informar placa e CNH!", 400);
      }
    } else if (data.role_id === 4) {
      if (!data.universidade || !data.curso) {
        throw new AppError(
          "Estudantes devem informar universidade e curso!",
          400
        );
      }
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const userData: ICreateUserDTO = {
      nome: data.nome?.toUpperCase(),
      sobre_nome: data.sobre_nome?.toUpperCase(),
      email: data.email?.toLowerCase(),
      senha: hashedPassword,
      cpf_cnpj: data.cpf_cnpj,
      telefone: data.telefone,
      role_id: data.role_id,
      universidade: data.universidade?.toUpperCase(),
      curso: data.curso?.toUpperCase(),
      placa: data.placa?.toUpperCase(),
      veiculo: data.veiculo?.toUpperCase(),
      cor_veiculo: data.cor_veiculo?.toUpperCase(),
      ano_veiculo: data.ano_veiculo,
      numero_cnh: data.numero_cnh,
      idade: data.idade,
    };

    return this.userRepository.create(userData);
  }
}
