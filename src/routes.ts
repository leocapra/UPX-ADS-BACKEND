// src/routes.ts
import { Router } from "express";
import { CreateUserController } from "./modules/Users/UseCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./modules/Users/UseCases/AuthenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./shared/middlewares/ensureAuthenticated";
import { GetUserProfileController } from "./modules/Users/UseCases/GetUserProfile/GetUserProfileController";
import { ensureAuthorized } from "./shared/middlewares/ensureAuthorized";
import { UpdateAvatarController } from "./modules/Users/UseCases/UpdateAvatar/UpdateAvatarController";
import { UpdateUserController } from "./modules/Users/UseCases/UpdateUser/UpdateUserController";
import { CreateCorridaController } from "./modules/Corridas/UseCases/CreateCorrida/CreateCorridaController";
import { GetRideController } from "./modules/Corridas/UseCases/GetRide/GetRideController";
import { GetRideByIdController } from "./modules/Corridas/UseCases/GetRideById/GetRideByIdController";
import { DeleteRideByIdController } from "./modules/Corridas/UseCases/DeleteRideById/DeleteRideByIdController";
import { UpdateAcceptRideByClientIdController } from "./modules/Corridas/UseCases/UpdateAcceptRideByClientId/UpdateAcceptRideByClientIdController";
import { GetRideHistoryByIdStudentController } from "./modules/Corridas/UseCases/GetRideHistoryByIdStudent/GetRideHistoryByIdStudentController";
import { GetRideHistoryByIdDriverController } from "./modules/Corridas/UseCases/GetRideHistoryByIdDriver/GetRideHistoryByIdDriverController";
import { GetActiveRideByDriverIdController } from "./modules/Corridas/UseCases/GetActiveRideByDriverId/GetActiveRideByDriverIdController";

const routes = Router();

routes.post("/register", CreateUserController.handle);
routes.post("/login", AuthenticateUserController.handle);

routes.get("/profile", ensureAuthenticated, GetUserProfileController.handle);

routes.get(
  "/admin",
  ensureAuthenticated,
  ensureAuthorized([1]),
  (request, response) => {
    response.json({ message: "Acesso de administrador permitido" });
  }
);

routes.put("/avatar", ensureAuthenticated, UpdateAvatarController.handle);

routes.put("/user", ensureAuthenticated, UpdateUserController.handle);

routes.post("/corridas", CreateCorridaController.handle);

routes.get("/getRide", GetRideController.handle);

routes.post("/getRideById", GetRideByIdController.handle);

routes.delete("/cancelRideById/:data", DeleteRideByIdController.handle);

routes.post("/acceptRideByClientId", UpdateAcceptRideByClientIdController.handle)

routes.post("/getRideHistoryByIdStudent", GetRideHistoryByIdStudentController.handle)

routes.post("/getRideHistoryByIdDriver", GetRideHistoryByIdDriverController.handle)

routes.post("/getActiveRideByDriverId", GetActiveRideByDriverIdController.handle)

export default routes;
