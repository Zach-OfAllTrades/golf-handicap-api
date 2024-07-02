import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMetricLabel1718116391343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE metric SET title = 'Avg Score' WHERE key = 'avg_score';`
    );
    await queryRunner.query(
      `UPDATE metric SET title = 'Avg SOP' WHERE key = 'avg_sop';`
    );
    await queryRunner.query(
      `UPDATE metric SET title = 'Avg Diff' WHERE key = 'avg_diff';`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
