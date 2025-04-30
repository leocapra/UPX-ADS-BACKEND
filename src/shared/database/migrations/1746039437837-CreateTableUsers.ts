import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1746039437837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            sobre_nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            telefone VARCHAR(20),
            idade INTEGER,
            cpf_cnpj VARCHAR(20) NOT NULL UNIQUE,
            universidade VARCHAR(100),
            curso VARCHAR(100),
            role_id INTEGER NOT NULL,
            placa VARCHAR(10),
            veiculo VARCHAR(50),
            cor_veiculo VARCHAR(30),
            ano_veiculo INTEGER,
            numero_cnh VARCHAR(20),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            CONSTRAINT FK_user_role FOREIGN KEY (role_id) 
              REFERENCES roles(id) ON DELETE RESTRICT
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
