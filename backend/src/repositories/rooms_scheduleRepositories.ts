import { AppDataSource } from "../data-source";
import { Rooms_schedule } from "../entities/Schedules";

export const userRepository = AppDataSource.getRepository(Rooms_schedule);