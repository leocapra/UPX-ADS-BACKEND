import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCorridas1746248125510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "corridas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "driver_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "client_id",
            type: "integer",
          },
          {
            name: "rating",
            type: "int",
            isNullable: true,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
          {
            name: "accept",
            type: "boolean",
            default: false,
          },
          {
            name: "origem",
            type: "jsonb",
            isNullable: false,
          },
          {
            name: "destino",
            type: "jsonb",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["client_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["driver_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("corridas");
  }
}
