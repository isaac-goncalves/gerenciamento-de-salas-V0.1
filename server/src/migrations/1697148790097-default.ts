import { MigrationInterface, QueryRunner } from "typeorm";

export class default1697148790097 implements MigrationInterface {
    name = 'default1697148790097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "horario_inicio" character varying NOT NULL, "horario_fim" character varying NOT NULL, "id_professor" integer NOT NULL, "uuid_agendamento" character varying NOT NULL, "id_grade" integer NOT NULL, "id_laboratorio" integer NOT NULL, "schedule_status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_318aea4f92ad250a82fc43b9e82" FOREIGN KEY ("id_professor") REFERENCES "professores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_318aea4f92ad250a82fc43b9e82"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
    }

}