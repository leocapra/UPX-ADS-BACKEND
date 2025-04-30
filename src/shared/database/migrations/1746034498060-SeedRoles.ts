import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedRoles1746034498060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO roles (description) VALUES
            ('Administrador'),
            ('TI'),
            ('Motorista'),
            ('Estudante');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles`);
  }
}
