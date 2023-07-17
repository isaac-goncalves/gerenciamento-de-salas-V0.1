"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeRepositories = void 0;
const data_source_1 = require("../data-source");
const Grade_1 = require("../entities/Grade");
exports.gradeRepositories = data_source_1.AppDataSource.getRepository(Grade_1.Grade);
