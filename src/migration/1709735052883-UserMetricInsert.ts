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

    // await queryRunner.query(
    //   `INSERT INTO user_metric ("user_id", "metric_id")
    //   VALUES
    //   (${userId}, '4b1f323c-4073-4496-8788-a0a189efbe39'),
    //   (${userId}, '9d564890-42f9-4254-b66a-327c7ddc5429'),
    //   (${userId}, '159c4734-0ccf-4688-931b-53a95ac2b512'),
    //   (${userId}, '27f0a4c3-8057-4300-a10d-f4dafda86619'),
    //   (${userId}, '110c892f-c51d-463a-b294-e57e30a5bd2f');`
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user_metric`);
  }
}
