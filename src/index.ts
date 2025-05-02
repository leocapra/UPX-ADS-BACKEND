import "reflect-metadata";
import "dotenv/config";
import "./shared/container";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { errorHandler } from "./shared/middlewares/errorHandler";

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected!");

    await AppDataSource.runMigrations();
    console.log("📦 Migrations executed!");

    const app = express();

    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/health", (req, res) => {
      res.status(200).json({ status: "UP" });
    });

    app.use("/api", routes);

    app.use(errorHandler);

    app.use((req, res) => {
      res.status(404).json({ message: "Endpoint não encontrado" });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
