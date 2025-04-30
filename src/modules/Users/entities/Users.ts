import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  nome!: string;

  @Column({ name: "sobre_nome", length: 100, nullable: false })
  sobre_nome!: string;

  @Column({ length: 100, nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  senha!: string;

  @Column({ length: 20, nullable: true })
  telefone!: string;
  @Column({ nullable: true })
  idade!: number;

  @Column({ name: "cpf_cnpj", length: 20, nullable: false, unique: true })
  cpf_cnpj!: string;

  @Column({ length: 100, nullable: true })
  universidade!: string;

  @Column({ length: 100, nullable: true })
  curso!: string;

  @Column({ name: "role_id", nullable: false })
  role_id!: number;

  @Column({ length: 10, nullable: true })
  placa!: string;

  @Column({ length: 50, nullable: true })
  veiculo!: string;

  @Column({ name: "cor_veiculo", length: 30, nullable: true })
  cor_veiculo!: string;

  @Column({ name: "ano_veiculo", nullable: true })
  ano_veiculo!: number;

  @Column({ name: "numero_cnh", length: 20, nullable: true })
  numero_cnh!: string;

  @Column({ name: "created_at", type: "timestamp", default: () => "NOW()" })
  created_at!: Date;

  @Column({ name: "updated_at", type: "timestamp", default: () => "NOW()" })
  updated_at!: Date;
}
