import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsers1746215908539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE users 
          RENAME COLUMN idade TO avatar;
          
          ALTER TABLE users 
          ALTER COLUMN avatar TYPE VARCHAR(255);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE users 
          RENAME COLUMN avatar TO idade;
          
          ALTER TABLE users 
          ALTER COLUMN idade TYPE INTEGER;
        `);
  }
}
