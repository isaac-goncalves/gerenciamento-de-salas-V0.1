import { Router } from "express";

import { UserController } from "./controllers/UsersControllers";
// import { TransactionsController } from "./controllers/TransactionsControllers";

const routes = Router();

routes.post("/register", new UserController().create);
routes.post("/verify", new UserController().verify);
routes.post("/login", new UserController().login);
// routes.post("/transaction", new TransactionsController().create);

export default routes ;
