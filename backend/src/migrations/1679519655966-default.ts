import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679519655966 implements MigrationInterface {
    name = 'default1679519655966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dias_da_semana" ("id" SERIAL NOT NULL, "Dia_da_semana" character varying NOT NULL, CONSTRAINT "PK_253377aee483fcf102d6dc1bc92" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dias_da_semana"`);
    }

}
