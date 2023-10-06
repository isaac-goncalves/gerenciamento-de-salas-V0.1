import { MigrationInterface, QueryRunner } from "typeorm";

export class default1696559015742 implements MigrationInterface {
    name = 'default1696559015742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professor_disciplina" ("id" SERIAL NOT NULL, "id_professor" integer NOT NULL, "id_disciplina" integer NOT NULL, CONSTRAINT "PK_a6795f0cb35be752891e62ce40c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "professor_disciplina"`);
    }

}
