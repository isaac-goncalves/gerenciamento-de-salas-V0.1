import { AppDataSource } from "../data-source";
import { Dias_da_semana } from "../entities/Dias_da_semana";

export const disciplinasRepository = AppDataSource.getRepository(Dias_da_semana);