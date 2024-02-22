import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Courses } from "../entity/Course";

export class CoursesController {

    private coursesRepository = AppDataSource.getRepository(Courses);

    async all(request: Request, response: Response, next: NextFunction) {        
        return this.coursesRepository.find({
            relations: {
                tees: true
            }
        })
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;


        const user = await this.coursesRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
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