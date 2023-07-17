import { AppDataSource } from "../data-source";
import { Disciplinas } from "../entities/Disciplinas";

export const disciplinasRepository = AppDataSource.getRepository(Disciplinas);