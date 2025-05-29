import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableCorridas1748463097618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "corridas",
      new TableColumn({
        name: "client02_id",
        type: "integer",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "corridas",
      new TableForeignKey({
        columnNames: ["client02_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("corridas");

    if (table) {
      const foreignKey = table.foreignKeys.find((fk) =>
        fk.columnNames.includes("client02_id")
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey("corridas", foreignKey);
      }
    }

    await queryRunner.dropColumn("corridas", "client02_id");
  }
}
