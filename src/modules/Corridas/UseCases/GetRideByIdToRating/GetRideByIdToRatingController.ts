import { Request, Response } from "express";
import { Corrida } from "../../entities/Corrida";
import { container } from "tsyringe";
import { GetRideByIdToRatingUseCase } from "./GetRideByIdToRatingUseCase";

class GetRideByIdToRatingController {
  static async handle(request: Request, reponse: Response): Promise<any> {
    const { data } = request.body;
    try {
      const getRideByIdToRatingUseCase = container.resolve(
        GetRideByIdToRatingUseCase
      );
      const get = await getRideByIdToRatingUseCase.execute(data);
      reponse.status(201).json(get);
    } catch (error) {
      reponse.status(400).json({
        error: error.message,
      });
    }
  }
}

export { GetRideByIdToRatingController };
