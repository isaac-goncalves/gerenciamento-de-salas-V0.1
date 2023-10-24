import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698110000961 implements MigrationInterface {
    name = 'default1698110000961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "guests" ("id" SERIAL NOT NULL, "semestre" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_4948267e93869ddcc6b340a2c46" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "guests"`);
    }

}
