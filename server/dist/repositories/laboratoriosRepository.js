"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.laboratoriosRepository = void 0;
const data_source_1 = require("../data-source");
const Laboratorios_1 = require("../entities/Laboratorios");
exports.laboratoriosRepository = data_source_1.AppDataSource.getRepository(Laboratorios_1.Laboratorios);
