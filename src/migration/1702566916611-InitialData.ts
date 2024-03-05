import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialData1702566916611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //     await queryRunner.query(
    //       `INSERT INTO users ("firstName", "lastName", email, "profilePic", "registrationDate", username, password) VALUES  ('Zachary', 'Rose', 'zach.rose.1008@gmail.com', 'link.com/pic', '${new Date().toISOString()}', 'zach.rose', 'dummyP@ssword');`
    //     );
    //     // Insert data into Courses table
    //     await queryRunner.query(`
    //   INSERT INTO courses ("courseName", "displayName", location)
    // VALUES
    //   ('Stillwater Golf & Country Club', 'Stillwater', 'St. Johns, FL'),
    //   ('Baker''s Bay Golf & Ocean Club', 'Baker''s Bay', 'Great Guana Cay, Bahamas'),
    //   ('Sanctuary Golf Club', 'Sanctuary', 'Waverly, GA'),
    //   ('Oak Marsh at Omni Amelia Island Resort', 'Oak Marsh', 'Fernandina Beach, FL'),
    //   ('Queen''s Harbour Yacht & Country Club', 'Queen''s Harbour', 'Jacksonville, FL'),
    //   ('Ponte Vedra Inn & Club - Ocean Course', 'PVIC - Ocean Course', 'Ponte Vedra Beach, FL'),
    //   ('Hidden Hills Golf Club', 'Hidden Hills', 'Jacksonville, FL');
    // `);
    //     const stillwaterId = await queryRunner
    //       .query(
    //         `SELECT id FROM courses WHERE "courseName" = 'Stillwater Golf & Country Club'`
    //       )
    //       .then((obj) => obj[0].id);
    //     const bakersId = await queryRunner
    //       .query(
    //         `SELECT id FROM courses WHERE "courseName" = 'Baker''s Bay Golf & Ocean Club'`
    //       )
    //       .then((obj) => obj[0].id);
    //     const sancId = await queryRunner
    //       .query(
    //         `SELECT id FROM courses WHERE "courseName" = 'Sanctuary Golf Club'`
    //       )
    //       .then((obj) => obj[0].id);
    //     const oakId = await queryRunner
    //       .query(
    //         `SELECT id FROM courses WHERE "courseName" = 'Oak Marsh at Omni Amelia Island Resort'`
    //       )
    //       .then((obj) => obj[0].id);
    //     const queensId = await queryRunner
    //       .query(
    //         `SELECT id FROM courses WHERE "courseName" = 'Queen''s Harbour Yacht & Country Club'`
    //       )
    //       .then((obj) => obj[0].id);
    //     const pvId = await queryRunner
    //       .query(
    //         `SELECT id FROM courses WHERE "courseName" = 'Ponte Vedra Inn & Club - Ocean Course'`
    //       )
    //       .then((obj) => obj[0].id);
    //     const hiddenId = await queryRunner
    //       .query(
    //         `SELECT id FROM courses WHERE "courseName" = 'Hidden Hills Golf Club'`
    //       )
    //       .then((obj) => obj[0].id);
    //     console.log("stillwaterId: ", stillwaterId);
    //     await queryRunner.query(`
    //   INSERT INTO tees ("courseId", "teeName", rating, slope, yardage, par)
    //   VALUES
    //     ('${stillwaterId}', 'Blue', 69.8, 122, 6314, 72),
    //     ('${bakersId}', 'II', 71.6, 131, 6678, 72),
    //     ('${pvId}', 'Blue', 71, 123, 6397, 71),
    //     ('${queensId}', 'Gold', 71.6, 131, 6621, 72),
    //     ('${sancId}', 'Blue', 71.4, 129, 6670, 72),
    //     ('${hiddenId}', 'Blue', 72.2, 131, 6623, 72),
    //     ('${oakId}', 'Blue', 69.8, 124, 6068, 72);
    // `);
    //     const userId = await queryRunner
    //       .query(`SELECT id FROM users WHERE email = 'zach.rose.1008@gmail.com'`)
    //       .then((obj) => obj[0].id);
    //     const teeStillwaterId = await queryRunner
    //       .query(`SELECT id FROM tees WHERE "courseId" = '${stillwaterId}'`)
    //       .then((obj) => obj[0].id);
    //     const teeBakersId = await queryRunner
    //       .query(`SELECT id FROM tees WHERE "courseId" = '${bakersId}'`)
    //       .then((obj) => obj[0].id);
    //     const teeSancId = await queryRunner
    //       .query(`SELECT id FROM tees WHERE "courseId" = '${sancId}'`)
    //       .then((obj) => obj[0].id);
    //     const teeOakId = await queryRunner
    //       .query(`SELECT id FROM tees WHERE "courseId" = '${oakId}'`)
    //       .then((obj) => obj[0].id);
    //     const teeQueensId = await queryRunner
    //       .query(`SELECT id FROM tees WHERE "courseId" = '${queensId}'`)
    //       .then((obj) => obj[0].id);
    //     const teePvId = await queryRunner
    //       .query(`SELECT id FROM tees WHERE "courseId" = '${pvId}'`)
    //       .then((obj) => obj[0].id);
    //     const teeHiddenId = await queryRunner
    //       .query(`SELECT id FROM tees WHERE "courseId" = '${hiddenId}'`)
    //       .then((obj) => obj[0].id);
    //     await queryRunner.query(`
    //   INSERT INTO rounds ("userId", score, "teeId", "detailsId", ags, date)
    //   VALUES
    //     ('${userId}', 89, '${teeBakersId}', NULL, 87, '2023-05-26'),
    //     ('${userId}', 85, '${teeBakersId}', NULL, 83, '2023-05-28'),
    //     ('${userId}', 86, '${teeStillwaterId}', NULL, 86, '2023-06-02'),
    //     ('${userId}', 83, '${teeStillwaterId}', NULL, 82, '2023-06-09'),
    //     ('${userId}', 79, '${teeOakId}', NULL, 79, '2023-06-11'),
    //     ('${userId}', 87, '${teeSancId}', NULL, 86, '2023-06-19'),
    //     ('${userId}', 88, '${teeStillwaterId}', NULL, 87, '2023-06-21'),
    //     ('${userId}', 83, '${teeStillwaterId}', NULL, 83, '2023-06-23'),
    //     ('${userId}', 86, '${teeStillwaterId}', NULL, 86, '2023-07-09'),
    //     ('${userId}', 82, '${teeStillwaterId}', NULL, 82, '2023-08-12'),
    //     ('${userId}', 85, '${teeStillwaterId}', NULL, 84, '2023-08-19'),
    //     ('${userId}', 86, '${teeStillwaterId}', NULL, 86, '2023-08-25'),
    //     ('${userId}', 93, '${teeQueensId}', NULL, 89, '2023-09-22'),
    //     ('${userId}', 89, '${teeStillwaterId}', NULL, 87, '2023-09-29'),
    //     ('${userId}', 90, '${teeStillwaterId}', NULL, 90, '2023-10-06'),
    //     ('${userId}', 83, '${teeStillwaterId}', NULL, 83, '2023-10-13'),
    //     ('${userId}', 85, '${teeHiddenId}', NULL, 85, '2023-10-14'),
    //     ('${userId}', 80, '${teeStillwaterId}', NULL, 80, '2023-10-29'),
    //     ('${userId}', 86, '${teePvId}', NULL, 85, '2023-11-03'),
    //     ('${userId}', 91, '${teeStillwaterId}', NULL, 91, '2023-12-08'),
    //     ('${userId}', 89, '${teeStillwaterId}', NULL, 88, '2023-12-10');
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM rounds;");
    await queryRunner.query("DELETE FROM tees;");
    await queryRunner.query("DELETE FROM courses;");
    await queryRunner.query("DELETE FROM users;");
  }
}
