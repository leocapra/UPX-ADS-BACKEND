import { Request, Response } from "express";
import { Corrida } from "../../entities/Corrida";
import { container } from "tsyringe";
import { GetActiveRideByDriverIdUseCase } from "./GetActiveRideByDriverIdUseCase";

class GetActiveRideByDriverIdController {
  static async handle(request: Request, reponse: Response): Promise<any> {
    const { data } = request.body;
    try {
      const getActiveRideByDriverIdUseCase = container.resolve(GetActiveRideByDriverIdUseCase);
      const get = await getActiveRideByDriverIdUseCase.execute(data);
      reponse.status(201).json(get);
    } catch (error) {
      reponse.status(400).json({
        error: error.message,
      });
    }
  }
}

export { GetActiveRideByDriverIdController };
