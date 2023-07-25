import 'dotenv/config'
import 'reflect-metadata'

import { DataSource } from "typeorm";

const host = process.env.DB_HOST;
const port = process.env.DB_PORT as number | undefined;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

export const AppDataSource = new DataSource({
    port: port,
    type: "postgres",
    host: host,
    username: username,
    password: password,
    database: database,
    entities:   [`${__dirname}/**/entities/*.{ts,js}`],
    migrations:   [`${__dirname}/**/migrations/*.{ts,js}`],
})