import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679185897502 implements MigrationInterface {
    name = 'default1679185897502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grade" ADD "id_sala" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grade" DROP COLUMN "id_sala"`);
    }

}
