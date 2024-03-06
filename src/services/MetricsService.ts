import dayjs = require("dayjs");
import { Rounds } from "../entity/Round";
import { AppDataSource } from "../data-source";
import { Between } from "typeorm";
import { HANDICAP_DIFFS, STANDARD_DATE_FORMAT } from "../rules";
import { getCurrentValidRounds } from "./RoundsService";
import Users from "../entity/Users";

const TREND_MEASUREMENTS = {
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

const METRIC_FUNCS = {
  handicap: (rounds, trendRounds) => getHandicapMetric(rounds, trendRounds),
  avg_score: (rounds: string) => getAverageScore(rounds),
  avg_diff: (rounds: string) => getAverageDiff(rounds),
  avg_sop: (rounds: string) => getAverageSop(rounds),
  handicap_trend: (rounds: string) => getUserHandicap(rounds),
  lowest: (rounds: string) => getLowestRound(rounds),
};

const getAverage = (array) => array.reduce((a, b) => a + b) / array.length;
const standardizeDate = (date: any) => dayjs(date).format(STANDARD_DATE_FORMAT);

export const getMetrics = async (
  user: Users,
  trendMeasurement: string = TREND_MEASUREMENTS.MONTH
) => {
  // accept a user -> get all rounds off user obj -> calc current valid
  // accept trendMeasurement -> calc trend valid w/ all rounds
  // get metric keys off user -> trigger metric func -> add to metric array
  const { rounds, userMetrics } = user;
  const currentRounds = getCurrentRounds(rounds);
  const trendRounds = getTrendRounds(rounds, trendMeasurement);
  const metrics = userMetrics.map((userMetric) => userMetric.metric);
  const calc = metrics
    .filter((m) => m.key === "handicap")
    .map((metric) => {
      const calculation = METRIC_FUNCS[metric.key](currentRounds, trendRounds);
      const calculatedMetric: any = metric;
      calculatedMetric.calculation = calculation;
      return calculatedMetric;
    });
  console.log("calc", calc);
};

const getTrendRounds = (allRounds, trendMeasurement) => {
  const endDate = dayjs().subtract(1, trendMeasurement);
  const yearFromEnd = dayjs(endDate).subtract(1, "year");
  return getValidRounds(
    allRounds,
    standardizeDate(yearFromEnd),
    standardizeDate(endDate)
  );
};

const getCurrentRounds = (allRounds) => {
  const today = new Date();
  const yearAgo = dayjs(today).subtract(1, "year");
  return getValidRounds(
    allRounds,
    standardizeDate(yearAgo),
    standardizeDate(today)
  );
};

const getValidRounds = (rounds, to, from) => {
  const roundsWithinDates = rounds.filter(
    (round) =>
      !dayjs(round.date).isBefore(to) && !dayjs(round.date).isAfter(from)
  );
  return roundsWithinDates.length > 20
    ? roundsWithinDates.sort((a, b) => b.date - a.date).slice(0, 20)
    : roundsWithinDates;
};

const getHandicapMetric = (currentRounds, trendRounds) => {
  const currentHandicap: any = calculateHandicap(currentRounds);
  const previousHandicap: any = calculateHandicap(trendRounds);
  const trend = currentHandicap - previousHandicap;

  return { current: currentHandicap, trend };
};

export const getUserHandicap = async (userId) => {
  return getCurrentValidRounds(userId).then((rounds) => {
    return calculateHandicap(rounds);
  });
};

const calculateHandicap = (rounds) => {
  // TODO: account for this return type
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

const calulateSupportMetrics = () => {
  // what support metrics are selected? Later functionality
};

export const getAverageScore = (userId) => {
  return getCurrentValidRounds(userId).then((rounds) => {
    const scores = rounds.map((round) => round.score);
    return getAverage(scores);
  });
};

export const getAverageDiff = (userId) => {
  return getCurrentValidRounds(userId).then((rounds) => {
    const agsDiffs = rounds.map((round) => round.ags - round.tee.par);
    return getAverage(agsDiffs);
  });
};

export const getAverageSop = (userId) => {
  return getCurrentValidRounds(userId).then((rounds) => {
    const scoreDiffs = rounds.map((round) => round.score - round.tee.par);
    return getAverage(scoreDiffs);
  });
};

export const getLowestRound = (userId) => {
  return getCurrentValidRounds(userId).then((rounds) => {
    return Math.min(...rounds.map((round) => round.score));
  });
};

const calculateHandicapTrend = async (
  userId,
  currentHandicap,
  trendMeasurement
) => {
  // Monthly trend of users handicap, go back a month & calculate handicap, then compare it to current.
  const endDate = dayjs().subtract(1, trendMeasurement);
  const yearFromEnd = dayjs(endDate).subtract(1, "year");

  const roundsArray = await getValidRounds(userId, yearFromEnd, endDate);
  const oldHandicap: any = calculateHandicap(roundsArray);
  const trend = currentHandicap - oldHandicap;
  return trend.toFixed(1);
};

const calculateTrend = async (metric, oldMetric) => {
  const trend = metric - oldMetric;
  return trend.toFixed(1);
};

// SAFE GAURDS:
// - You submit an exceptional score, which is 7.0 strokes or better than your Handicap Index at the time the round is played, or
// - Your 8 of 20 calculation is 3.0 or more strokes above your Low Handicap Index™ from the previous 365 days.
