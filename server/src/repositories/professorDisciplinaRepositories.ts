import { AppDataSource } from "../data-source";
import { ProfessorDisciplina } from "../entities/Professores_Disciplinas";

export const professorDisciplinaRepositories = AppDataSource.getRepository(ProfessorDisciplina);