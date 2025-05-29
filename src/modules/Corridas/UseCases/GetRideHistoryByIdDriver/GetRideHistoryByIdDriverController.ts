import { Request, Response } from "express";
import { Corrida } from "../../entities/Corrida";
import { container } from "tsyringe";
import { GetRideHistoryByIdDriverUseCase } from "./GetRideHistoryByIdDriverUseCase";

class GetRideHistoryByIdDriverController {
  static async handle(request: Request, reponse: Response): Promise<any> {
    const { data } = request.body;
    try {
      const getRideHistoryByIdDriverUseCase = container.resolve(GetRideHistoryByIdDriverUseCase);
      const get = await getRideHistoryByIdDriverUseCase.execute(data);
      reponse.status(201).json(get);
    } catch (error) {
      reponse.status(400).json({
        error: error.message,
      });
    }
  }
}

export { GetRideHistoryByIdDriverController };
