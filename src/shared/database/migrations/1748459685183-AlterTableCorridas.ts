import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableCorridas1748459685183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "corridas",
      new TableColumn({
        name: "cancelled",
        type: "boolean",
        default: false,
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropColumn("corridas", "cancelled");
  }
}
