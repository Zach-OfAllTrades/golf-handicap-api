import { Rounds } from "../entity/Round";
import { AppDataSource } from "../data-source";
import { Between } from "typeorm";

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