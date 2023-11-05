import { MigrationInterface, QueryRunner } from "typeorm";

export class default1699195683001 implements MigrationInterface {
    name = 'default1699195683001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorios" DROP COLUMN "numero_sala"`);
        await queryRunner.query(`ALTER TABLE "laboratorios" ADD "numero_sala" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorios" DROP COLUMN "numero_sala"`);
        await queryRunner.query(`ALTER TABLE "laboratorios" ADD "numero_sala" character varying`);
    }

}
