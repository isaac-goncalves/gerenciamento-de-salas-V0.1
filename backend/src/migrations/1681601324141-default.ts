import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681601324141 implements MigrationInterface {
    name = 'default1681601324141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alunos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "user_id" integer NOT NULL, "semestre" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_0090f2d8573e71e8e4e274db905" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" SERIAL NOT NULL, "horario_inicio" character varying NOT NULL, "horario_fim" character varying NOT NULL, "dia_da_semana" integer NOT NULL, "id_professor" integer, "id_disciplina" integer, "semestre" integer NOT NULL, "id_sala" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying, "email" character varying, "user_id" integer, "disciplina" character varying, "created_at" TIMESTAMP, "updated_at" TIMESTAMP, CONSTRAINT "PK_13f01466be85817b29ed8abf74f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "professores"`);
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`DROP TABLE "alunos"`);
    }

}
