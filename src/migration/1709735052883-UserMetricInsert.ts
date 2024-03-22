import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMetricInsert1709735052883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userId = await queryRunner
      .query(`SELECT id FROM users WHERE email = 'zach.rose.1008@gmail.com';`)
      .then((obj) => obj[0].id);

    const metricIds = await queryRunner
      .query(`SELECT id FROM metric;`)
      .then((objArr) => objArr.map((obj) => obj.id));

    metricIds.forEach(async (metricId) => {
      await queryRunner.query(
        `INSERT INTO user_metric ("user_id", "metric_id") 
      VALUES  
      ('${userId}', '${metricId}');`
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user_metric`);
  }
}
