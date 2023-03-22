import { AppDataSource } from "../data-source";
import { Laboratorios } from "../entities/Laboratorios";

export const laboratoriosRepository = AppDataSource.getRepository(Laboratorios);