"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semestresRepository = void 0;
const data_source_1 = require("../data-source");
const Semestres_1 = require("../entities/Semestres");
exports.semestresRepository = data_source_1.AppDataSource.getRepository(Semestres_1.Semestres);
