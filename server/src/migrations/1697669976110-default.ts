import { MigrationInterface, QueryRunner } from "typeorm";

export class default1697669976110 implements MigrationInterface {
    name = 'default1697669976110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" ALTER COLUMN "id_laboratorio" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" ALTER COLUMN "id_laboratorio" SET NOT NULL`);
    }

}
