import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { FinishRideByIdUseCase } from "./FinishRideByIdUseCase";

class FinishRideByIdController {
  static async handle(request: Request, response: Response): Promise<any> {
    const { data } = request.body;

    try {
      const finishRideByIdUseCase = container.resolve(FinishRideByIdUseCase);
      const update = await finishRideByIdUseCase.execute(data);
      response.status(201).json(update);
    } catch (error) {
      response.status(500).json({
        error: error.message,
      });
    }
  }
}

export { FinishRideByIdController };
