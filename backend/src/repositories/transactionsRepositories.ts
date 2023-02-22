import { AppDataSource } from "../data-source";
import { Transactions } from "../entities/Transactions";


export const transactionsRepository = AppDataSource.getRepository(Transactions);