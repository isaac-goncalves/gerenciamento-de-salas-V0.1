import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684603919456 implements MigrationInterface {
    name = 'default1684603919456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying, "email" character varying, "user_id" integer, "disciplina" integer, "created_at" TIMESTAMP, "updated_at" TIMESTAMP, CONSTRAINT "PK_13f01466be85817b29ed8abf74f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "horario_inicio" character varying NOT NULL, "horario_fim" character varying NOT NULL, "id_professor" integer NOT NULL, "id_grade" character varying NOT NULL, "id_laboratorio" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_318aea4f92ad250a82fc43b9e82" FOREIGN KEY ("id_professor") REFERENCES "professores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_318aea4f92ad250a82fc43b9e82"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`DROP TABLE "professores"`);
    }

}
