import { MigrationInterface, QueryRunner } from "typeorm";

export class MakesUsedAtNullable1780950213502 implements MigrationInterface {
    name = 'MakesUsedAtNullable1780950213502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "magic_link" ALTER COLUMN "usedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "magic_link" ALTER COLUMN "usedAt" SET NOT NULL`);
    }

}
