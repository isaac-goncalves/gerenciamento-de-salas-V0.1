"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dia_da_semanaRepositories = void 0;
const data_source_1 = require("../data-source");
const Dias_da_semana_1 = require("../entities/Dias_da_semana");
exports.dia_da_semanaRepositories = data_source_1.AppDataSource.getRepository(Dias_da_semana_1.Dias_da_semana);
