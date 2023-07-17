import { AppDataSource } from "../data-source";
import { Professores } from "../entities/Professores";

export const professoresRepository = AppDataSource.getRepository(Professores);