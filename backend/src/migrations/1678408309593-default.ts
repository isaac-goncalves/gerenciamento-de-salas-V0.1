import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678408309593 implements MigrationInterface {
    name = 'default1678408309593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classrooms" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "capacity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_20b7b82896c06eda27548bd0c24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "class_id" character varying NOT NULL, "professor_id" character varying NOT NULL, "capacity" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "action" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "userIdId" integer, CONSTRAINT "REL_9e6136ebf149091c270efd6d24" UNIQUE ("userIdId"), CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "degree"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "class_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "UQ_0bd416bc8572eff2152e078544b" UNIQUE ("userIdId")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_0bd416bc8572eff2152e078544b" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_9e6136ebf149091c270efd6d247" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_9e6136ebf149091c270efd6d247"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_0bd416bc8572eff2152e078544b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "UQ_0bd416bc8572eff2152e078544b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "class_name"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "degree" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "classrooms"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
