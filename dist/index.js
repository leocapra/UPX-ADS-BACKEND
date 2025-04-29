"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source"); // Ajuste o caminho conforme sua estrutura
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Inicializa o banco de dados
        yield data_source_1.AppDataSource.initialize();
        console.log('✅ Database connected!');
        // Executa migrações pendentes
        yield data_source_1.AppDataSource.runMigrations();
        console.log('📦 Migrations executed!');
        // Inicia o Express
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
    });
}
startServer().catch((error) => {
    console.error('❌ Failed to start server:', error);
});
