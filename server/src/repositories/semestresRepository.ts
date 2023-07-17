import { AppDataSource } from "../data-source";
import { Semestres } from "../entities/Semestres";

export const semestresRepository = AppDataSource.getRepository(Semestres);