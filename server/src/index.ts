import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import cors from "cors";
import https from "https"; // Import the 'https' module
import fs from "fs"; // Import the 'fs' module



AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(cors());

    app.use(routes);

    // Create an HTTPS server using the SSL/TLS certificates
    return app.listen(3333, () => console.log("Ola Isaac: Servidor rodando na porta 3333"));

});
