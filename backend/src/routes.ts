import { Router } from "express";

import { UserController } from "./controllers/UsersControllers";
import { TransactionsController } from "./controllers/TransactionsControllers";

const routes = Router();

routes.post("/users", new UserController().create);
routes.post("/login", new UserController().login);
routes.post("/transaction", new TransactionsController().create);

export default routes ;
