import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AppError } from "../../../../errors/AppError";
import { IAuthenticateUserDTO } from "../../DTOs/UserDTO";

export class AuthenticateUserController {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, senha, role }: IAuthenticateUserDTO = request.body;

      if (!role) {
        throw new AppError("Role não fornecido", 400);
      }

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const { user, token } = await authenticateUserUseCase.execute({
        email,
        senha,
        role,
      });

      response.status(200).json({
        message: "Autenticação bem-sucedida",
        user,
        token,
      });
    } catch (err) {
      if (err instanceof AppError) {
        response.status(err.statusCode).json({
          message: err.message,
        });
      } else {
        console.error("Unexpected error:", err);
        response.status(500).json({
          message: "Erro interno do servidor",
        });
      }
    }
  }
}
