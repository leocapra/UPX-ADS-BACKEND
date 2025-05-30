import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { RateRideUseCase } from "./RateRideUseCase";

class RateRideController {
  static async handle(request: Request, response: Response): Promise<any> {
    const { rideId, rating } = request.body;
    try {
      const rateRideUseCase = container.resolve(RateRideUseCase);
      const update = await rateRideUseCase.execute(rideId, rating);
      response.status(201).json(update);
    } catch (error) {
      response.status(500).json({
        error: error.message,
      });
    }
  }
}

export { RateRideController };
