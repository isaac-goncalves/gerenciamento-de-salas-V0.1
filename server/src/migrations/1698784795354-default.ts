import { MigrationInterface, QueryRunner } from "typeorm";

export class default1698784795354 implements MigrationInterface {
    name = 'default1698784795354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "periodo"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "id_professor"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "id_professor" integer`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "periodo" character varying NOT NULL`);
    }

}
