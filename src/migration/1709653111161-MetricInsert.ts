import { MigrationInterface, QueryRunner } from "typeorm";

export class MetricInsert1709653111161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO metric ("key", "title") 
      VALUES  
      ('handicap', 'Handicap'), 
      ('avg_score', 'Average Score'), 
      ('avg_diff', 'Average Differential'), 
      ('avg_sop', 'Average Shots Over Par'),
      ('lowest', 'Lowest Round');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM metric`);
  }
}
