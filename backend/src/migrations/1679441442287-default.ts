import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679441442287 implements MigrationInterface {
    name = 'default1679441442287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grade" ("id" SERIAL NOT NULL, "horario_inicio" character varying NOT NULL, "horario_fim" character varying NOT NULL, "id_professor" character varying NOT NULL, "dia_da_semana" character varying NOT NULL, "id_disciplina" character varying NOT NULL, "id_sala" character varying NOT NULL, "semestre" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "grade"`);
    }

}
