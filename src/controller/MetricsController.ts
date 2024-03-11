import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Metric } from "../entity/Metric";
import Users from "../entity/Users";
import { getMetric, getMetrics } from "../services/MetricsService";

export class MetricsController {
  private usersRepository = AppDataSource.getRepository(Users);
  private metricRepository = AppDataSource.getRepository(Metric);

  async one(request: Request, response: Response, next: NextFunction) {
    const userId = request.params.userId;
    const key = request.params.metricKey;
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        rounds: {
          tee: true,
        },
      },
    });
    const metric = await this.metricRepository.findOne({
      where: { key },
    });
    return await getMetric(user!, metric!);
  }

  async byUser(request: Request, response: Response, next: NextFunction) {
    const userId = request.params.userId;

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        rounds: {
          tee: true,
        },
        userMetrics: {
          metric: true,
        },
      },
    });

    return await getMetrics(user!);
  }
}
