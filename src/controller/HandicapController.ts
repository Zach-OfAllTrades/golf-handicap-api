import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Courses } from "../entity/Course";
import { getUserHandicap } from "../services/HandicapService";

export class HandicapController {

    private coursesRepository = AppDataSource.getRepository(Courses);

    async all(request: Request, response: Response, next: NextFunction) {        
        return this.coursesRepository.find({
            relations: {
                tees: true
            }
        })
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const userId = request.params.userId;
        return await getUserHandicap(userId);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { courseName, displayName, location } = request.body;

        const user = Object.assign(new Courses(), {
            courseName,
            displayName,
            location,
        })

        return this.coursesRepository.save(user)
    }
}