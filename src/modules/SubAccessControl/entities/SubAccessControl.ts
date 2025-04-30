import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { AccessControl } from "../../AccessControl/entities/AccessControl";

@Entity("sub_access_control")
export class SubAccessControl {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ length: 255, nullable: false })
  path!: string;

  @ManyToOne(() => AccessControl)
  menu!: AccessControl;
}
