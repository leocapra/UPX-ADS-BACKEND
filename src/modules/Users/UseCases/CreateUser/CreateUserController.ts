import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "../../DTOs/UserDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateUserController {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: ICreateUserDTO = request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);
      const user = await createUserUseCase.execute(data);

      response.status(201).json(user);
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
