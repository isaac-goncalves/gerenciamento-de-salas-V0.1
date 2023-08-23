import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import cors from "cors";
import https from "https"; // Import the 'https' module
import fs from "fs"; // Import the 'fs' module

const sslOptions = {
    key: fs.readFileSync("./cert/nice-beach-060306510.3.azurestaticapps.net.key"),
    cert: fs.readFileSync("./cert/nice-beach-060306510.3.azurestaticapps.net.crt")
};

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(cors());

    app.use(routes);

    // Create an HTTPS server using the SSL/TLS certificates
    const server = https.createServer(sslOptions, app);

    server.listen(443, () => {
        console.log("Ola Isaac: Servidor rodando na porta 443 com HTTPS ativado");
    });
});
