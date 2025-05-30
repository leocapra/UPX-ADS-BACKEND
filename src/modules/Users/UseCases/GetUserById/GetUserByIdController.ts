import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

class GetUserByIdController {
  static async handle(request: Request, reponse: Response): Promise<any> {
    const { data } = request.body;
    try {
      const getUserByIdUseCase = container.resolve(GetUserByIdUseCase);
      const get = await getUserByIdUseCase.execute(data);
      reponse.status(201).json(get);
    } catch (error) {
      reponse.status(400).json({
        error: error.message,
      });
    }
  }
}

export { GetUserByIdController };
