import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { port } from "./config";
import * as morgan from "morgan";
import { Tees } from "./entity/Tee";
import Users from "./entity/Users";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(morgan("tiny"));
    app.use(bodyParser.json());
    app.use(cors());

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            res.json(result);
          } catch (error) {
            next(error);
          }
        }
      );
    });

    app.listen(port);
    await AppDataSource.runMigrations();

    console.log(`Express server has started on port ${port}.`);
  })
  .catch((error) => console.log(error));
