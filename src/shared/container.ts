import { container } from "tsyringe";
import { IUserRepository } from "../modules/Users/Repository/IUserRepository";
import { UserRepository } from "../modules/Users/Repository/implementations/UserRepository";
import { IAccessControlRepository } from "../modules/AccessControl/Repository/IAccessControlRepository";
import { AccessControlRepository } from "../modules/AccessControl/Repository/implementations/AccessControlRepository";
import { ICorridasRepository } from "@/modules/Corridas/Repository/ICorridasRepository";
import { CorridasRepository } from "@/modules/Corridas/Repository/implementations/CorridasRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IAccessControlRepository>(
  "AccessControlRepository",
  AccessControlRepository
);

container.registerSingleton<ICorridasRepository>(
  "CorridasRepository",
  CorridasRepository
);


