import { AppDataSource } from "../data-source";
import { Accounts } from "../entities/Accounts";

export const accountsRepository = AppDataSource.getRepository(Accounts);