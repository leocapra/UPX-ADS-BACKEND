import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "../../Roles/entities/Role";
import { AccessControl } from "../../AccessControl/entities/AccessControl";

@Entity("vinc_role_permission_main")
export class VincRolePermissionMain {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Role, { createForeignKeyConstraints: true })
  @JoinColumn({ name: "roleId" })
  role!: Role;

  @ManyToOne(() => AccessControl, { createForeignKeyConstraints: true })
  @JoinColumn({ name: "menuId" })
  menu!: AccessControl;
}
