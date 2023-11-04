import { MigrationInterface, QueryRunner } from "typeorm";

export class default1699138456804 implements MigrationInterface {
    name = 'default1699138456804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorios" ADD "course_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "laboratorios" DROP COLUMN "course_id"`);
    }

}
