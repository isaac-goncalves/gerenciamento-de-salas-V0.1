import 'dotenv/config'
import 'reflect-metadata'

import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    port: port,
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "2406",
    database: "gerenciamento-de-salas",
    entities:   [`${__dirname}/**/entities/*.{ts,js}`],
    migrations:   [`${__dirname}/**/migrations/*.{ts,js}`],
})