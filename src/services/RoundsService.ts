import { Rounds } from "../entity/Round";
import { AppDataSource } from "../data-source";
import { Between } from "typeorm";
import dayjs = require("dayjs");
import { STANDARD_DATE_FORMAT } from "../rules";

const standardizeDate = (date: any) => dayjs(date).format(STANDARD_DATE_FORMAT);

export const getCurrentValidRounds = async (userId) => {
  const today = new Date();
  const yearAgo = dayjs(today).subtract(1, "year");
  return await getValidRounds(
    userId,
    standardizeDate(yearAgo),
    standardizeDate(today)
  );
};
export const getValidRounds = async (userId, from, to) => {
  const roundsRepository = AppDataSource.getRepository(Rounds);
  return roundsRepository.find({
    where: { user: { id: userId }, date: Between(from, to) },
    order: {
      date: "DESC",
    },
    take: 20,
    relations: {
      tee: { course: true },
    },
  });
};
