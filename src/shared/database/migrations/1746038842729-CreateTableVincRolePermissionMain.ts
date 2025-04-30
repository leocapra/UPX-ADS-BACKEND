import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableVincRolePermissionMain1746038842729
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE vinc_role_permission_main (
            id SERIAL PRIMARY KEY,
            role_id INTEGER NOT NULL,
            menu_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            CONSTRAINT FK_role_main FOREIGN KEY (role_id) 
              REFERENCES roles(id) ON DELETE CASCADE,
            CONSTRAINT FK_menu_main FOREIGN KEY (menu_id) 
              REFERENCES access_control(id) ON DELETE CASCADE,
            CONSTRAINT UQ_role_menu_main UNIQUE (role_id, menu_id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE vinc_role_permission_main`);
  }
}
