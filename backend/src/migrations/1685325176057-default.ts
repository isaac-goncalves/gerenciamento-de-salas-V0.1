import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685325176057 implements MigrationInterface {
    name = 'default1685325176057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" DROP COLUMN "uuid_agendamento"`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD "uuid_agendamento" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" DROP COLUMN "uuid_agendamento"`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD "uuid_agendamento" integer NOT NULL`);
    }

}
