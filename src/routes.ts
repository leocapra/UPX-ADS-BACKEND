import { Router } from "express";
import { CreateUserController } from "./modules/Users/UseCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./modules/Users/UseCases/AuthenticateUser/AuthenticateUserController";

const routes = Router();

routes.post("/register", CreateUserController.handle);
routes.post("/login", AuthenticateUserController.handle)

export default routes;
