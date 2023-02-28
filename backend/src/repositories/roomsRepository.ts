import { AppDataSource } from "../data-source";
import { Rooms } from "../entities/Classrooms";

export const userRepository = AppDataSource.getRepository(Rooms);