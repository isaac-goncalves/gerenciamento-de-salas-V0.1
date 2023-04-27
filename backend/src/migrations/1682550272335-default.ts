import { MigrationInterface, QueryRunner } from "typeorm";

export class default1682550272335 implements MigrationInterface {
    name = 'default1682550272335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying, "email" character varying, "user_id" integer, "disciplina" integer, "created_at" TIMESTAMP, "updated_at" TIMESTAMP, CONSTRAINT "PK_13f01466be85817b29ed8abf74f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "professores"`);
    }

}
