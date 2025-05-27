import { Request, Response } from "express";
import { Corrida } from "../../entities/Corrida";
import { container } from "tsyringe";
import { GetRideByIdUseCase } from "./GetRideByIdUseCase";

class GetRideByIdController {
  static async handle(request: Request, reponse: Response): Promise<any> {
    const { data } = request.body;
    try {
      const getRideByIdUseCase = container.resolve(GetRideByIdUseCase);
      const get = await getRideByIdUseCase.execute(data);
      reponse.status(201).json(get);
    } catch (error) {
      reponse.status(400).json({
        error: error.message,
      });
    }
  }
}

export { GetRideByIdController };
