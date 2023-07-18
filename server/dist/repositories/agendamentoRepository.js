"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendamentosRepository = void 0;
const data_source_1 = require("../data-source");
const Agendamento_1 = require("../entities/Agendamento");
exports.agendamentosRepository = data_source_1.AppDataSource.getRepository(Agendamento_1.Agendamento);
