import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756990757815 implements MigrationInterface {
    name = 'Init1756990757815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_token_hash" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_token_expires" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_token_expires"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_token_hash"`);
    }

}
