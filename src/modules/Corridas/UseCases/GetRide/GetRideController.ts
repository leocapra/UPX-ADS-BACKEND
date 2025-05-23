import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetRideUseCase } from "./GetRideUseCase";

class GetRideController {
  static async handle(request: Request, response: Response): Promise<any> {
    console.log('entrei')
    try {
      const getRideUseCase = container.resolve(GetRideUseCase);
      const get = await getRideUseCase.execute();

      response.status(201).json(get);
    } catch (error) {
      response.status(400).json({
        error: error.message || "Erro na consulta da corrida",
      });
    }
  }
}

export { GetRideController };
