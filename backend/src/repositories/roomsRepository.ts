import { AppDataSource } from "../data-source";
import { Rooms } from "../entities/Rooms";

export const userRepository = AppDataSource.getRepository(Rooms);