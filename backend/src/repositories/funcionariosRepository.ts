import { AppDataSource } from "../data-source";
import { Funcionarios } from "../entities/Funcionarios";

export const userRepository = AppDataSource.getRepository(Funcionarios);