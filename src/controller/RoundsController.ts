import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Rounds } from "../entity/Round";
import { Between } from "typeorm";
import Users from "../entity/Users";
import { Tees } from "../entity/Tee";

export class RoundsController {
  private roundsRepository = AppDataSource.getRepository(Rounds);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.roundsRepository.find();
  }

  async allByUser(request: Request, response: Response, next: NextFunction) {
    const userId = request.params.userId;
    return this.roundsRepository.find({
      where: { user: { id: userId } },
      relations: {
        tee: { course: true },
      },
      order: {
        date: "DESC",
      },
    });
  }

  async allValid(request: Request, response: Response, next: NextFunction) {
    const userId = request.params.userId;
    const { to, from } = request.body;
    return this.roundsRepository.find({
      where: { user: { id: userId }, date: Between(from, to) },
      order: {
        date: "DESC",
      },
      take: 20,
      relations: {
        tee: { course: true },
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    const user = await this.roundsRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { score, userId, teeId, ags, date } = request.body;
    const user = await AppDataSource.getRepository(Users).findOne({
      where: { id: userId },
    });
    const tee = await AppDataSource.getRepository(Tees).findOne({
      where: { id: teeId },
    });

    const round = Object.assign(new Rounds(), {
      score,
      user,
      tee,
      ags,
      date,
    });

    try {
      return await this.roundsRepository.save(round);
    } catch (e) {
      console.log("ERROR: ", e);
      return response.status(500);
    }
  }
}
