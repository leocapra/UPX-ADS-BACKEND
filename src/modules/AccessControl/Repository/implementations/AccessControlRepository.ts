import { inject, injectable } from "tsyringe";
import { getRepository } from "typeorm";
import { AccessControl } from "../../entities/AccessControl"; // Menu
import { IAccessControlRepository } from "../IAccessControlRepository"; // Importando a interface
import { SubAccessControl } from "../../../SubAccessControl/entities/SubAccessControl";
import { VincRolePermissionMain } from "../../../VincRolePermissionMain/entities/VincRolePermissionMain";
import { VincRolePermissionSub } from "../../../VincRolePermissionSub/entities/VincRolePermissionSub";

@injectable()
export class AccessControlRepository implements IAccessControlRepository {
  async getMenusForRole(roleId: number): Promise<AccessControl[]> {
    const menus = await getRepository(AccessControl)
      .createQueryBuilder("menu")
      .leftJoin(VincRolePermissionMain, "v", "v.menu_id = menu.id")
      .where("v.role_id = :roleId", { roleId })
      .getMany();

    return menus;
  }

  async getSubmenusForRole(roleId: number): Promise<SubAccessControl[]> {
    const submenus = await getRepository(SubAccessControl)
      .createQueryBuilder("submenu")
      .leftJoin(VincRolePermissionSub, "v", "v.submenu_id = submenu.id")
      .where("v.role_id = :roleId", { roleId })
      .getMany();

    return submenus;
  }
}
