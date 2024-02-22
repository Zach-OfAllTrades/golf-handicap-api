import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Tees } from "../entity/Tee";

export class TeesController {
  private teesRepository = AppDataSource.getRepository(Tees);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.teesRepository.find({
      select: {
        course: {
          id: true,
          courseName: true,
        },
      },
      relations: {
        course: true,
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    const user = await this.teesRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { teeName, courseId, rating, slope, par, yardage } = request.body;

    const user = Object.assign(new Tees(), {
      teeName,
      courseId,
      rating,
      slope,
      par,
      yardage,
    });

    return this.teesRepository.save(user);
  }
}
