import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685301135261 implements MigrationInterface {
    name = 'default1685301135261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "semestres" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_36c741654af49e9d3952b220269" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "semestres"`);
    }

}
