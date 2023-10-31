import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698719296270 implements MigrationInterface {
    name = 'default1698719296270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "course_name" character varying NOT NULL, "periodo" character varying NOT NULL, "id_professor" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "professores" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "grade" ADD "grade_id" integer`);
        await queryRunner.query(`ALTER TABLE "grade" ADD "course_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "disciplinas" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "guests" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "alunos" ADD "course_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alunos" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "disciplinas" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP COLUMN "grade_id"`);
        await queryRunner.query(`ALTER TABLE "agendamento" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "professores" DROP COLUMN "course_id"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
