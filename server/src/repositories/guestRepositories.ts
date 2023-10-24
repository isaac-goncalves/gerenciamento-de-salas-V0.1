import { AppDataSource } from "../data-source";
import { Guests } from "../entities/Guests";

export const guestRepositories = AppDataSource.getRepository(Guests);