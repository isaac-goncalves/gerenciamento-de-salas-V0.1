import { AppDataSource } from "../data-source";
import { Usuarios } from "../entities/Usuarios";

export const usuariosRepository = AppDataSource.getRepository(Usuarios);