import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { UpdateAcceptRideByClientIdUseCase } from "./UpdateAcceptRideByClientIdUseCase";

class UpdateAcceptRideByClientIdController {
  static async handle(request: Request, response: Response): Promise<any> {
    const { data, driverInfo } = request.body;
    const { driverId } = driverInfo;

    try {
      const updateAcceptRideByClientIdUseCase = container.resolve(
        UpdateAcceptRideByClientIdUseCase
      );
      const update = await updateAcceptRideByClientIdUseCase.execute(
        data,
        driverId
      );
      response.status(201).json(update);
    } catch (error) {
      response.status(500).json({
        error: error.message,
      });
    }
  }
}

export { UpdateAcceptRideByClientIdController };
