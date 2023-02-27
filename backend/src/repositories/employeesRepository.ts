import { AppDataSource } from "../data-source";
import { Employees } from "../entities/Employees";

export const employeesRepository = AppDataSource.getRepository(Employees);