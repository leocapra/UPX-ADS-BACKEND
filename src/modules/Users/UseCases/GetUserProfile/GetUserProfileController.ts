import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";
import { AppError } from "../../../../errors/AppError";

// Interface local com a tipagem do user
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role_id: number;
  };
}

export class GetUserProfileController {
  static async handle(
    request: AuthenticatedRequest,
    response: Response
  ): Promise<void> {
    try {
      const userId = request.user?.id;

      if (!userId) {
        throw new AppError("Não autorizado", 401);
      }

      const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);
      const user = await getUserProfileUseCase.execute(userId);

      response.json(user);
    } catch (err) {
      if (err instanceof AppError) {
        response.status(err.statusCode).json({ message: err.message });
      } else {
        response.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }
}
