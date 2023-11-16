import { MigrationInterface, QueryRunner } from "typeorm";

export class default1700083493572 implements MigrationInterface {
    name = 'default1700083493572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "horario_inicio" character varying, "horario_fim" character varying, "id_professor" integer NOT NULL, "uuid_agendamento" character varying NOT NULL, "id_grade" integer NOT NULL, "course_id" integer, "id_laboratorio" integer, "schedule_status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "agendamento"`);
    }

}
