import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677455218980 implements MigrationInterface {
    name = 'default1677455218980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "user_verified" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_verified"`);
    }

}
