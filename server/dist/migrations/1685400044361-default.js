"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1685400044361 = void 0;
class default1685400044361 {
    constructor() {
        this.name = 'default1685400044361';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "professores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying, "email" character varying, "user_id" integer, "disciplina" integer, "created_at" TIMESTAMP, "updated_at" TIMESTAMP, CONSTRAINT "PK_13f01466be85817b29ed8abf74f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "agendamento" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "horario_inicio" character varying NOT NULL, "horario_fim" character varying NOT NULL, "id_professor" integer NOT NULL, "uuid_agendamento" character varying NOT NULL, "id_grade" character varying NOT NULL, "id_laboratorio" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "alunos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "user_id" integer NOT NULL, "semestre" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_0090f2d8573e71e8e4e274db905" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "disciplinas" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_63ac31213d82b3a8e99c1a6c4a3" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "dias_da_semana" ("id" SERIAL NOT NULL, "dia_da_semana" character varying NOT NULL, CONSTRAINT "PK_253377aee483fcf102d6dc1bc92" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "grade" ("id" SERIAL NOT NULL, "horario_inicio" character varying NOT NULL, "horario_fim" character varying NOT NULL, "dia_da_semana" integer NOT NULL, "id_professor" integer, "id_disciplina" integer, "semestre" integer NOT NULL, "id_sala" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "laboratorios" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "andar" integer NOT NULL, "capacidade" integer NOT NULL, CONSTRAINT "PK_f3e5296e106c63a9f075157f4bd" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "semestres" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_36c741654af49e9d3952b220269" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_318aea4f92ad250a82fc43b9e82" FOREIGN KEY ("id_professor") REFERENCES "professores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_318aea4f92ad250a82fc43b9e82"`);
            yield queryRunner.query(`DROP TABLE "usuarios"`);
            yield queryRunner.query(`DROP TABLE "semestres"`);
            yield queryRunner.query(`DROP TABLE "laboratorios"`);
            yield queryRunner.query(`DROP TABLE "grade"`);
            yield queryRunner.query(`DROP TABLE "dias_da_semana"`);
            yield queryRunner.query(`DROP TABLE "disciplinas"`);
            yield queryRunner.query(`DROP TABLE "alunos"`);
            yield queryRunner.query(`DROP TABLE "agendamento"`);
            yield queryRunner.query(`DROP TABLE "professores"`);
        });
    }
}
exports.default1685400044361 = default1685400044361;