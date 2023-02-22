import { AppDataSource } from "../data-source";
import { User } from "../entities/Users";

export const userRepository = AppDataSource.getRepository(User);