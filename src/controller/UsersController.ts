import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import Users from "../entity/Users";
import { Between } from "typeorm";
import { Rounds } from "../entity/Round";
import dayjs = require("dayjs");

export class UsersController {

  getYearAgo = () => {
    const today  = new Date();
    const yearAgo = dayjs(today).subtract(1, "month");
    return dayjs(yearAgo).format("YYYY-MM-DD")
  }

  private usersRepository = AppDataSource.getRepository(Users);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.usersRepository.find({
      relations: {
        rounds: {
          tee: true,
        },
      },
    });
  }

  // TODO: FIX: this does not return user when there are no rounds within the date range - may call for queryBuilder & raw SQL
  // brings back everything with a year, maybe only 20 records? 
  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const to = request.params.to ?? new Date();
    const from = request.params.from ?? this.getYearAgo().toString();

    const user = await this.usersRepository.findOne({
      where: { id, rounds: { date: Between(from, to) } },
      relations: {
        rounds: {
          tee: true,
        },
      },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, username, password } = request.body;

    const user = Object.assign(new Users(), {
      firstName,
      lastName,
      email,
      username,
      password,
      registrationDate: new Date().getTime(),
    });

    return this.usersRepository.save(user);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    let userToRemove = await this.usersRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.usersRepository.remove(userToRemove);

    return "user has been removed";
  }
}
