// src/modules/corridas/controllers/CreateCorridaController.ts
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCorridaUseCase } from "./CreateCorridaUseCase";

class CreateCorridaController {
  static async handle(request: Request, response: Response): Promise<void> {
    try {
      const createCorridaUseCase = container.resolve(CreateCorridaUseCase);
      const corrida = await createCorridaUseCase.execute(request.body);

      response.status(201).json(corrida);
    } catch (error) {
      response.status(400).json({
        error: error.message || "Erro ao criar corrida",
      });
    }
  }
}

export { CreateCorridaController };
