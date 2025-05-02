import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../Repository/IUserRepository";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/Users";

interface IRequest {
  userId?: number;
  avatar: string;
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ userId, avatar }: IRequest): Promise<User> {
    if (!userId) {
      throw new AppError("Usuário não autenticado", 401);
    }
    console.log('avatar', avatar)

    if (typeof avatar !== "number" || avatar < 0 || avatar > 9) {
      throw new AppError("Avatar inválido", 400);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    user.avatar = avatar;

    return this.userRepository.save(user);
  }
}
