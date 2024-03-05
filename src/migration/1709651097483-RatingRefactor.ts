import { MigrationInterface, QueryRunner } from "typeorm";

export class RatingRefactor1709651097483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tees" ALTER COLUMN "rating" TYPE decimal`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    `ALTER TABLE "tees" ALTER COLUMN "rating" TYPE integer`;
  }
}
