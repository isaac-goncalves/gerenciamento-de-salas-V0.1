import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698784644505 implements MigrationInterface {
    name = 'default1698784644505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "course_name" character varying NOT NULL, "periodo" character varying NOT NULL, "id_professor" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "alunos" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "professores" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "disciplinas" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "guests" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "grade" ADD "grade_id" integer`);
        await queryRunner.query(`ALTER TABLE "grade" ADD "course_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grade" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP COLUMN "grade_id"`);
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "disciplinas" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "agendamento" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "professores" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "alunos" DROP COLUMN "course_id"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
