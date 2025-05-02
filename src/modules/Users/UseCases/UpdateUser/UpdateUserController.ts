// src/modules/Users/UseCases/UpdateUser/UpdateUserController.ts
import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
// import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { AppError } from "../../../../errors/AppError";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role_id: number;
  };
}

export class UpdateUserController {
  static async handle(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, universidade, curso, telefone } = request.body;
      console.log("request.body", request.body)
      const userId = Number(request.user?.id);

      const updateUserUseCase = container.resolve(UpdateUserUseCase);

      const user = await updateUserUseCase.execute({
        userId,
        email,
        universidade,
        curso,
        telefone,
      });

      response.status(200).json({
        message: "Dados atualizados com sucesso",
        user: {
          id: user.id,
          email: user.email,
          universidade: user.universidade,
          curso: user.curso,
          telefone: user.telefone,
          role_id: user.role_id,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
