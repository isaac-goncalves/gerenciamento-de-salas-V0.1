import { MigrationInterface, QueryRunner } from "typeorm";

export class default1700004906415 implements MigrationInterface {
    name = 'default1700004906415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professores_cursos" ("id" SERIAL NOT NULL, "id_professor" integer NOT NULL, "course_id" integer, CONSTRAINT "PK_7db85c789e1f1bfe6300ff67ded" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "professores_cursos" ADD CONSTRAINT "FK_bd4cab29088f14b6f82a5d8457f" FOREIGN KEY ("id_professor") REFERENCES "professores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professores_cursos" DROP CONSTRAINT "FK_bd4cab29088f14b6f82a5d8457f"`);
        await queryRunner.query(`DROP TABLE "professores_cursos"`);
    }

}
