import dayjs = require("dayjs");
import { HANDICAP_DIFFS, STANDARD_DATE_FORMAT } from "../rules";
import Users from "../entity/Users";
import { Metric } from "../entity/Metric";

const TREND_MEASUREMENTS = {
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

const METRIC_FUNCS = {
  handicap: (validRounds) => getHandicapMetric(validRounds),
  avg_score: (validRounds) => getAverageScore(validRounds),
  avg_diff: (validRounds) => getAverageDiff(validRounds),
  avg_sop: (validRounds) => getAverageSop(validRounds),
  lowest: (validRounds) => getLowestRound(validRounds),
};

const calcAverage = (array) => array.reduce((a, b) => a + b) / array.length;
const standardizeDate = (date: any) => dayjs(date).format(STANDARD_DATE_FORMAT);

export const getMetrics = async (
  user: Users,
  trendMeasurement: string = TREND_MEASUREMENTS.MONTH
) => {
  const { rounds, userMetrics } = user;
  const validRounds = getValidRounds(rounds, trendMeasurement);
  const metrics = userMetrics.map((userMetric) => userMetric.metric);
  return metrics.map((metric) => {
    return calcMetric(metric, validRounds);
  });
};

export const getMetric = async (
  user: Users,
  metric: Metric,
  trendMeasurement: string = TREND_MEASUREMENTS.MONTH
) => {
  const { rounds } = user;
  const validRounds = getValidRounds(rounds, trendMeasurement);
  return calcMetric(metric, validRounds);
};

const calcMetric = (metric, validRounds) => {
  const calculatedMetric: any = metric;
  calculatedMetric.value = METRIC_FUNCS[metric.key](validRounds);
  return calculatedMetric;
};

const getValidRounds = (rounds, trendMeasurement) => {
  const currentRounds = getCurrentRounds(rounds);
  const trendRounds = getTrendRounds(rounds, trendMeasurement);
  return { currentRounds, trendRounds };
};

const getTrendRounds = (allRounds, trendMeasurement) => {
  const endDate = dayjs().subtract(1, trendMeasurement);
  const yearFromEnd = dayjs(endDate).subtract(1, "year");
  return validateRounds(
    allRounds,
    standardizeDate(yearFromEnd),
    standardizeDate(endDate)
  );
};

const getCurrentRounds = (allRounds) => {
  const today = new Date();
  const yearAgo = dayjs(today).subtract(1, "year");
  return validateRounds(
    allRounds,
    standardizeDate(yearAgo),
    standardizeDate(today)
  );
};

const validateRounds = (rounds, to, from) => {
  const roundsWithinDates = rounds.filter(
    (round) =>
      !dayjs(round.date).isBefore(to) && !dayjs(round.date).isAfter(from)
  );
  return roundsWithinDates.length > 20
    ? roundsWithinDates.sort((a, b) => b.date - a.date).slice(0, 20)
    : roundsWithinDates;
};

const getHandicapMetric = ({ currentRounds, trendRounds }) => {
  const current: any = calculateHandicap(currentRounds);
  const previousHandicap: any = calculateHandicap(trendRounds);
  const trend = current - previousHandicap;
  return { current, trend: trend.toFixed(2) };
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
  const diffAverage = calcAverage(lowestRounds);
  // average of lowest scores (depending on rules) * .96;
  const rawHandicap = diffAverage * 0.96;

  return rawHandicap.toFixed(1);
};

const calculateRoundDiff = (ags, rating, slope, adjustment) => {
  // (AGS - Rating) * 113 / Slope
  const diff: any = ((ags - rating) * 113) / slope;
  return diff.toFixed(2) - adjustment;
};

export const getAverageScore = ({ currentRounds, trendRounds }) => {
  const currentScores = currentRounds.map((round) => round.score);
  const trendScores = trendRounds.map((round) => round.score);
  return calcAverageMetric(currentScores, trendScores);
};

export const getAverageDiff = ({ currentRounds, trendRounds }) => {
  const currentDiffs = currentRounds.map((round) => round.ags - round.tee.par);
  const trendDiffs = trendRounds.map((round) => round.ags - round.tee.par);
  return calcAverageMetric(currentDiffs, trendDiffs);
};

export const getAverageSop = ({ currentRounds, trendRounds }) => {
  const currentScoreDiffs = currentRounds.map(
    (round) => round.score - round.tee.par
  );
  const trendScoreDiffs = trendRounds.map(
    (round) => round.score - round.tee.par
  );
  return calcAverageMetric(currentScoreDiffs, trendScoreDiffs);
};

const calcAverageMetric = (currentAgg, trendAgg) => {
  const current = calcAverage(currentAgg);
  const trend = current - calcAverage(trendAgg);
  return { current, trend: trend.toFixed(2) };
};

export const getLowestRound = ({ currentRounds, trendRounds }) => {
  const current = calcLowestScore(currentRounds);
  const trend = current - calcLowestScore(trendRounds);
  return { current, trend };
};

const calcLowestScore = (rounds) => {
  return Math.min(...rounds.map((round) => round.score));
};

// SAFE GAURDS:
// - You submit an exceptional score, which is 7.0 strokes or better than your Handicap Index at the time the round is played, or
// - Your 8 of 20 calculation is 3.0 or more strokes above your Low Handicap Index™ from the previous 365 days.
