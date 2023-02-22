import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676225353271 implements MigrationInterface {
    name = 'default1676225353271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "accountidId" integer, CONSTRAINT "REL_f9181eeceddb33b48eaadb845e" UNIQUE ("accountidId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "debitedAccountidId" integer, "creditedAccountidId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f9181eeceddb33b48eaadb845ea" FOREIGN KEY ("accountidId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_393626c7fa6ca9d22f0c2a6d0bd" FOREIGN KEY ("debitedAccountidId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_33b389a53e375535d61c7e6df13" FOREIGN KEY ("creditedAccountidId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_33b389a53e375535d61c7e6df13"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_393626c7fa6ca9d22f0c2a6d0bd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f9181eeceddb33b48eaadb845ea"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
