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


export default routes;
