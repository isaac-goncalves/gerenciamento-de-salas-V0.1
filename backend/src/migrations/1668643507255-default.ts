import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668643507255 implements MigrationInterface {
    name = 'default1668643507255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "balance" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "balance" text NOT NULL`);
    }

}
