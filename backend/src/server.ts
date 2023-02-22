import express from "express";

import { Router, Request, Response } from "express";

const app = express();

const route = Router();

const { Sequelize } = require("sequelize");

import sequelize from "./database";

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world with Typescript" });
});

app.use(route);

const teste = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

teste();

app.listen(3333, () => console.log("server running on port 3333"));
