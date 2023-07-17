"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disciplinasRepository = void 0;
const data_source_1 = require("../data-source");
const Dias_da_semana_1 = require("../entities/Dias_da_semana");
exports.disciplinasRepository = data_source_1.AppDataSource.getRepository(Dias_da_semana_1.Dias_da_semana);
