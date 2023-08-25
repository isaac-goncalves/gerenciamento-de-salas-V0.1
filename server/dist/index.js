"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const https_1 = __importDefault(require("https")); // Import the 'https' module
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(routes_1.default);
    // Create an HTTPS server using the SSL/TLS certificates
    const server = https_1.default.createServer(app);
    server.listen(80, () => {
        console.log("Ola Isaac: Servidor rodando na porta 80");
    });
});
