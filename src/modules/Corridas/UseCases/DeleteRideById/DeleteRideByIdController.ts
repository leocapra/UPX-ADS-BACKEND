import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { DeleteRideByIdUseCase } from "./DeleteRideByIdUseCase";

class DeleteRideByIdController {
  static async handle(request: Request, response: Response) {
    const { data } = request.params;

    try {
      const deleteRideByIdUseCase = container.resolve(DeleteRideByIdUseCase);
      const del = await deleteRideByIdUseCase.execute(data);
      response.status(201).json(del);
    } catch (error) {
      response.status(500).json({
        error: error.message,
      });
    }
  }
}

export { DeleteRideByIdController };
