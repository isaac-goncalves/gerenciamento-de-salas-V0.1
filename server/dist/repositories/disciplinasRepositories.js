"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disciplinasRepository = void 0;
const data_source_1 = require("../data-source");
const Disciplinas_1 = require("../entities/Disciplinas");
exports.disciplinasRepository = data_source_1.AppDataSource.getRepository(Disciplinas_1.Disciplinas);
