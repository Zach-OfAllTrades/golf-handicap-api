import { NextFunction, Request, Response } from "express";
import { getUserHandicap } from "../services/MetricsService";

const METRIC_FUNCS = {
  handicap: (userId: string) => getUserHandicap(userId),
  avg_score: (userId: string) => getUserHandicap(userId),
  avg_diff: (userId: string) => getUserHandicap(userId),
  avg_sop: (userId: string) => getUserHandicap(userId),
  handicap_trend: (userId: string) => getUserHandicap(userId),
};

export class MetricsController {
  async getFormattedMetric(key: string, userId: string) {
    return { [key]: await METRIC_FUNCS[key](userId) };
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const userId = request.params.userId;
    const key = request.params.metricKey;
    return await this.getFormattedMetric(key, userId);
  }

  async some(request: Request, response: Response, next: NextFunction) {
    const { userId, metricKeys } = request.body;

    const metricMap = metricKeys.map(
      async (key: string) => await this.getFormattedMetric(key, userId)
    );

    const metrics = await Promise.all(metricMap);
    return metrics;
  }
}
