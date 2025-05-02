import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";
import { AppError } from "../../../../errors/AppError";

// Tipagem direta no controller
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role_id: number;
  };
}

export class UpdateAvatarController {
  static async handle(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { avatarIndex } = request.body;
      const { avatar_id } = avatarIndex;
      const avatar = avatar_id
      const userId = Number(request.user?.id);

      if (!userId) {
        throw new AppError("Usuário não encontrado", 400);
      }

      const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

        const user = await updateAvatarUseCase.execute({
          userId,
          avatar
        });

        response.status(200).json({
          message: "Avatar atualizado com sucesso",
          user,
        });
    } catch (err) {
      next(err);
    }
  }
}
