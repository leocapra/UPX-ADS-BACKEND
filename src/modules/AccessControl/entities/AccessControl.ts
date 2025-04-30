import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("access_control")
export class AccessControl {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ length: 255, nullable: true })
  icon?: string;

  @Column({ length: 100, nullable: false })
  path!: string;
}
