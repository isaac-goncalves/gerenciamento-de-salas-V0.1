import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698110542430 implements MigrationInterface {
    name = 'default1698110542430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guests" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "email"`);
    }

}
