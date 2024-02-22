import dayjs = require("dayjs");
import { Rounds } from "../entity/Round";
import { AppDataSource } from "../data-source";
import { Between } from "typeorm";
import { HANDICAP_DIFFS, STANDARD_DATE_FORMAT } from "../rules";

const standardizeDate = (date: any) => dayjs(date).format(STANDARD_DATE_FORMAT);
const getAverage = (array) => array.reduce((a, b) => a + b) / array.length;

export const getUserHandicap = async (userId) => {
  const today = new Date();
  const yearAgo = dayjs(today).subtract(1, "year");
  const roundsArray = await getValidRounds(
    userId,
    standardizeDate(yearAgo),
    standardizeDate(today)
  );
  const handicap = calculateHandicap(roundsArray);

  return {
    handicap,
    rounds: roundsArray, // TODO: GET RID OF THIS, FETCH ROUNDS SEPARATE
  };
};

const calculateHandicap = (rounds) => {
  if (rounds.length < 3) return "N/A";
  const { numberOfLowest, adjustment } = HANDICAP_DIFFS[rounds.length];
  const handicappedRounds = rounds.map((round) => {
    const { rating, slope } = round.tee;
    return calculateRoundDiff(round.ags, rating, slope, adjustment);
  });

  const lowestRounds = handicappedRounds
    .sort((a, b) => a - b)
    .slice(0, numberOfLowest);
  const diffAverage = getAverage(lowestRounds);
  // average of lowest scores (depending on rules) * .96;
  const rawHandicap = diffAverage * 0.96;

  return rawHandicap.toFixed(1);
};

const calculateRoundDiff = (ags, rating, slope, adjustment) => {
  // (AGS - Rating) * 113 / Slope
  const diff: any = ((ags - rating) * 113) / slope;
  return diff.toFixed(2) - adjustment;
};

const getValidRounds = async (userId, from, to) => {
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
