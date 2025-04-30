import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableVincRolePermissionSub1746038919832
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE vinc_role_permission_sub (
            id SERIAL PRIMARY KEY,
            role_id INTEGER NOT NULL,
            submenu_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            CONSTRAINT FK_role_sub FOREIGN KEY (role_id) 
              REFERENCES roles(id) ON DELETE CASCADE,
            CONSTRAINT FK_submenu_sub FOREIGN KEY (submenu_id) 
              REFERENCES sub_access_control(id) ON DELETE CASCADE,
            CONSTRAINT UQ_role_submenu UNIQUE (role_id, submenu_id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE vinc_role_permission_sub`);
  }
}
