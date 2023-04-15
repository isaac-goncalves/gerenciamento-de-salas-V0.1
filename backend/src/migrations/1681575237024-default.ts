import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681575237024 implements MigrationInterface {
    name = 'default1681575237024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grade" ("id" SERIAL NOT NULL, "horario_inicio" character varying NOT NULL, "horario_fim" character varying NOT NULL, "dia_da_semana" integer NOT NULL, "id_professor" integer, "id_disciplina" integer, "semestre" integer NOT NULL, "id_sala" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "grade"`);
    }

}
