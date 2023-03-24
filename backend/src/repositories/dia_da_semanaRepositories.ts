import { AppDataSource } from "../data-source";
import { Dias_da_semana } from "../entities/Dias_da_semana";

export const dia_da_semanaRepositories = AppDataSource.getRepository(Dias_da_semana);