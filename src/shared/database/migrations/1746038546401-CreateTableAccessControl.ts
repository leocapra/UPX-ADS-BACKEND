import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAccessControl1746038546401
  implements MigrationInterface
{
  name = "CreateTableAccessControl1746038546401";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE access_control (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            icon VARCHAR(255),
            path VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE access_control`);
  }
}
