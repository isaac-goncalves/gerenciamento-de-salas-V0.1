"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosRepository = void 0;
const data_source_1 = require("../data-source");
const Usuarios_1 = require("../entities/Usuarios");
exports.usuariosRepository = data_source_1.AppDataSource.getRepository(Usuarios_1.Usuarios);
