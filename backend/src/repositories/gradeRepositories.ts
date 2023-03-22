import { AppDataSource } from "../data-source";
import { Grade } from "../entities/Grade";

export const gradeRepositories = AppDataSource.getRepository(Grade);