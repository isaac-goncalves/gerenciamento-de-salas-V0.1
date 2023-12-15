import { MigrationInterface, QueryRunner } from "typeorm";

export class default1701638103719 implements MigrationInterface {
    name = 'default1701638103719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mensagem_temporaria" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "expiryDate" TIMESTAMP, CONSTRAINT "PK_4781af66e3c94c7a41af0a5aa3f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mensagem_temporaria"`);
    }

}
