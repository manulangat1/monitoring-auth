import { MigrationInterface, QueryRunner } from "typeorm";

export class AddsMagicLinkTable1780949179126 implements MigrationInterface {
    name = 'AddsMagicLinkTable1780949179126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "magic_link" ("id" SERIAL NOT NULL, "tokenHash" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "usedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_4fac5105519c1ac3e645d7f9416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2cd6d3735da85eda384e7fe2d3" ON "magic_link"  ("tokenHash") `);
        await queryRunner.query(`ALTER TABLE "magic_link" ADD CONSTRAINT "FK_83d1407078c34e92ad16003fa38" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "magic_link" DROP CONSTRAINT "FK_83d1407078c34e92ad16003fa38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2cd6d3735da85eda384e7fe2d3"`);
        await queryRunner.query(`DROP TABLE "magic_link"`);
    }

}
