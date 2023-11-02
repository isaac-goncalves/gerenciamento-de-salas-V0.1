import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698954314502 implements MigrationInterface {
    name = 'default1698954314502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dias_da_semana" ADD "course_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dias_da_semana" DROP COLUMN "course_id"`);
    }

}
