import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRoles1746034415351 implements MigrationInterface {
  name = "CreateTableRoles1746034415351";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" 
      (
      "id" SERIAL NOT NULL, 
      "description" character varying(50) NOT NULL, 
      CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
