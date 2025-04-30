import { SubAccessControl } from "../../SubAccessControl/entities/SubAccessControl";
import { AccessControl } from "../entities/AccessControl";

export interface IAccessControlRepository {
  getMenusForRole(roleId: number): Promise<AccessControl[]>;
  getSubmenusForRole(roleId: number): Promise<SubAccessControl[]>;
}
