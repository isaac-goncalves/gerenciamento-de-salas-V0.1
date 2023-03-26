import express from "express";

import { AppDataSource } from "./data-source";

import routes from "./routes";

import cors from "cors";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(cors());

    app.use(routes)

    return app.listen(3333, () => console.log("Ola Isaac: Servidor rodando na porta 3333"));
});

