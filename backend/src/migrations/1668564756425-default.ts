import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668564756425 implements MigrationInterface {
    name = 'default1668564756425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "debitedAccountid"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "creditedAccountid"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "debitedAccountidId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "creditedAccountidId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_393626c7fa6ca9d22f0c2a6d0bd" FOREIGN KEY ("debitedAccountidId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_33b389a53e375535d61c7e6df13" FOREIGN KEY ("creditedAccountidId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_33b389a53e375535d61c7e6df13"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_393626c7fa6ca9d22f0c2a6d0bd"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "creditedAccountidId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "debitedAccountidId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "creditedAccountid" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "debitedAccountid" integer NOT NULL`);
    }

}
