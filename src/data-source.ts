import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/shared/database/migrations/*.ts"],
  synchronize: process.env.NODE_ENV === "development",
});
