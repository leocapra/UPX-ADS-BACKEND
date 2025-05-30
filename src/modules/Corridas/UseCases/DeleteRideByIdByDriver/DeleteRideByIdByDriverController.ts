import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { DeleteRideByIdByDriverUseCase } from "./DeleteRideByIdByDriverUseCase";

class DeleteRideByIdByDriverController {
  static async handle(request: Request, response: Response) {
    const { data } = request.params;

    try {
      const deleteRideByIdByDriverUseCase = container.resolve(
        DeleteRideByIdByDriverUseCase
      );
      const del = await deleteRideByIdByDriverUseCase.execute(data);
      response.status(201).json(del);
    } catch (error) {
      response.status(500).json({
        error: error.message,
      });
    }
  }
}

export { DeleteRideByIdByDriverController };
