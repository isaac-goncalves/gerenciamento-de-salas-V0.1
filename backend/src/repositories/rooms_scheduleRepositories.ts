import { AppDataSource } from "../data-source";
import { Rooms_schedule } from "../entities/Grade";

export const userRepository = AppDataSource.getRepository(Rooms_schedule);