// src/modules/corridas/entities/Corrida.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../Users/entities/Users";

@Entity("corridas")
export class Corrida {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int", nullable: true })
  driver_id!: number | null;

  @Column({ type: "int" })
  client_id!: number;

  @Column({ type: "int", nullable: true })
  rating!: number | null;

  @Column({ default: true })
  active!: boolean;

  @Column({ default: false })
  accept!: boolean;

  @Column({ default: false })
  cancelled!: boolean;


  // Novos campos de localização
  @Column("jsonb")
  origem!: {
    latitude: number;
    longitude: number;
  };

  @Column("jsonb")
  destino!: {
    latitude: number;
    longitude: number;
    nome: string;
  };

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: "driver_id" })
  driver!: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "client_id" })
  client!: User;
}
