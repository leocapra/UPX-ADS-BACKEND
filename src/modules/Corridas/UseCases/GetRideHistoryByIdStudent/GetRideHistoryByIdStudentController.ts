import { Request, Response } from "express";
import { Corrida } from "../../entities/Corrida";
import { container } from "tsyringe";
import { GetRideHistoryByIdStudentUseCase } from "./GetRideHistoryByIdStudentUseCase";

class GetRideHistoryByIdStudentController {
  static async handle(request: Request, reponse: Response): Promise<any> {
    const { data } = request.body;
    try {
      const getRideHistoryByIdStudentUseCase = container.resolve(GetRideHistoryByIdStudentUseCase);
      const get = await getRideHistoryByIdStudentUseCase.execute(data);
      reponse.status(201).json(get);
    } catch (error) {
      reponse.status(400).json({
        error: error.message,
      });
    }
  }
}

export { GetRideHistoryByIdStudentController };
