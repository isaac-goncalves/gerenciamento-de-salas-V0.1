"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alunosRepository = void 0;
const data_source_1 = require("../data-source");
const Alunos_1 = require("../entities/Alunos");
exports.alunosRepository = data_source_1.AppDataSource.getRepository(Alunos_1.Alunos);
