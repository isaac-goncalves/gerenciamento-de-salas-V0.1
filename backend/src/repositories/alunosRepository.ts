import { AppDataSource } from "../data-source";
import { Alunos } from "../entities/Alunos";

export const alunosRepository = AppDataSource.getRepository(Alunos);