import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSubAccessControl1746038708315
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE sub_access_control (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            path VARCHAR(255) NOT NULL,
            menu_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            CONSTRAINT FK_submenu_menu FOREIGN KEY (menu_id)
              REFERENCES access_control(id) ON DELETE CASCADE
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE sub_access_control`);
  }
}
