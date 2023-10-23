import { MigrationInterface, QueryRunner } from "typeorm";

export class default1697669898282 implements MigrationInterface {
    name = 'default1697669898282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" ALTER COLUMN "horario_inicio" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agendamento" ALTER COLUMN "horario_fim" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" ALTER COLUMN "horario_fim" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agendamento" ALTER COLUMN "horario_inicio" SET NOT NULL`);
    }

}
