import { AppDataSource } from "../data-source";
import { Courses } from "../entities/Course";

export const coursesRepository = AppDataSource.getRepository(Courses);