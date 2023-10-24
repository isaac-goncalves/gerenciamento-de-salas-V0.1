import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698111731800 implements MigrationInterface {
    name = 'default1698111731800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guests" RENAME COLUMN "semestre" TO "semester"`);
        await queryRunner.query(`ALTER TABLE "guests" ALTER COLUMN "updated_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guests" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "guests" RENAME COLUMN "semester" TO "semestre"`);
    }

}
