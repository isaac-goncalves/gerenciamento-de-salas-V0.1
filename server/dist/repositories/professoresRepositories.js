"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professoresRepository = void 0;
const data_source_1 = require("../data-source");
const Professores_1 = require("../entities/Professores");
exports.professoresRepository = data_source_1.AppDataSource.getRepository(Professores_1.Professores);
