import { AppDataSource } from "../data-source";
import { Rooms_schedule } from "../entities/Rooms_schedule";

export const userRepository = AppDataSource.getRepository(Rooms_schedule);