import { AppDataSource } from "../data-source";
import { Classes } from "../entities/Classes";

export const userRepository = AppDataSource.getRepository(Classes);