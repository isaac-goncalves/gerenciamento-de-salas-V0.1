import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679773806974 implements MigrationInterface {
    name = 'default1679773806974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "horario_inicio" TIMESTAMP NOT NULL, "horario_fim" TIMESTAMP NOT NULL, "id_professor" character varying NOT NULL, "id_grade" character varying NOT NULL, "id_laboratorio" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "disciplinas" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_63ac31213d82b3a8e99c1a6c4a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professores" ("id" SERIAL NOT NULL, "nome_completo" character varying NOT NULL, "id_perfil_usuario" integer, CONSTRAINT "PK_13f01466be85817b29ed8abf74f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dias_da_semana" ("id" SERIAL NOT NULL, "dia_da_semana" character varying NOT NULL, CONSTRAINT "PK_253377aee483fcf102d6dc1bc92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "laboratorios" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "capacidade" integer NOT NULL, CONSTRAINT "PK_f3e5296e106c63a9f075157f4bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" SERIAL NOT NULL, "horario_inicio" character varying NOT NULL, "horario_fim" character varying NOT NULL, "id_professor" character varying NOT NULL, "dia_da_semana" character varying NOT NULL, "id_disciplina" character varying NOT NULL, "id_sala" character varying NOT NULL, "semestre" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`DROP TABLE "laboratorios"`);
        await queryRunner.query(`DROP TABLE "dias_da_semana"`);
        await queryRunner.query(`DROP TABLE "professores"`);
        await queryRunner.query(`DROP TABLE "disciplinas"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
    }

}
