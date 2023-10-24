import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698110804887 implements MigrationInterface {
    name = 'default1698110804887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guests" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "guests" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "created_at"`);
    }

}
