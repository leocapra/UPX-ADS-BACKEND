import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "../../Roles/entities/Role";
import { SubAccessControl } from "../../SubAccessControl/entities/SubAccessControl";

@Entity("vinc_role_permission_sub")
export class VincRolePermissionSub {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Role, { createForeignKeyConstraints: true })
  @JoinColumn({ name: "roleId" })
  role!: Role;

  @ManyToOne(() => SubAccessControl, { createForeignKeyConstraints: true })
  @JoinColumn({ name: "subMenuId" })
  subMenu!: SubAccessControl;
}
