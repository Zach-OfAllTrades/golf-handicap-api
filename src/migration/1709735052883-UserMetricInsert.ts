import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMetricInsert1709735052883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user_metric ("user_id", "metric_id") 
      VALUES  
      ('95532b04-fa19-496f-90dd-dbced6199525', '4b1f323c-4073-4496-8788-a0a189efbe39'), 
      ('95532b04-fa19-496f-90dd-dbced6199525', '9d564890-42f9-4254-b66a-327c7ddc5429'), 
      ('95532b04-fa19-496f-90dd-dbced6199525', '159c4734-0ccf-4688-931b-53a95ac2b512'), 
      ('95532b04-fa19-496f-90dd-dbced6199525', '27f0a4c3-8057-4300-a10d-f4dafda86619'),
      ('95532b04-fa19-496f-90dd-dbced6199525', '110c892f-c51d-463a-b294-e57e30a5bd2f');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user_metric`);
  }
}
