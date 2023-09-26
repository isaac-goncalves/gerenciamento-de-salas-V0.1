import { MigrationInterface, QueryRunner } from "typeorm";

export class default1695678704288 implements MigrationInterface {
    name = 'default1695678704288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "theme" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "theme"`);
    }

}
