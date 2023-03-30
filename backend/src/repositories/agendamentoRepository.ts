import { AppDataSource } from "../data-source";
import { Agendamento } from "../entities/Agendamento";

export const agendamentosRepository = AppDataSource.getRepository(Agendamento);