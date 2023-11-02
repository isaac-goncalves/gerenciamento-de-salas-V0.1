import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698954264981 implements MigrationInterface {
    name = 'default1698954264981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "semestres" ADD "course_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "semestres" DROP COLUMN "course_id"`);
    }

}
