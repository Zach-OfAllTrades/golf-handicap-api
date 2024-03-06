import { CoursesController } from "./controller/CoursesController";
import { MetricsController } from "./controller/MetricsController";
import { RoundsController } from "./controller/RoundsController";
import { TeesController } from "./controller/TeesController";
import { UsersController } from "./controller/UsersController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UsersController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UsersController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UsersController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UsersController,
    action: "remove",
  },
  {
    method: "get",
    route: "/courses",
    controller: CoursesController,
    action: "all",
  },
  {
    method: "get",
    route: "/courses/:id",
    controller: CoursesController,
    action: "one",
  },
  {
    method: "post",
    route: "/courses",
    controller: CoursesController,
    action: "save",
  },
  {
    method: "get",
    route: "/tees",
    controller: TeesController,
    action: "all",
  },
  {
    method: "get",
    route: "/tees/:id",
    controller: TeesController,
    action: "one",
  },
  {
    method: "post",
    route: "/tees",
    controller: TeesController,
    action: "save",
  },
  {
    method: "get",
    route: "/rounds",
    controller: RoundsController,
    action: "all",
  },
  {
    method: "get",
    route: "/rounds/:userId",
    controller: RoundsController,
    action: "allByUser",
  },
  {
    method: "post",
    route: "/rounds/valid/:userId",
    controller: RoundsController,
    action: "allValid",
  },
  {
    method: "get",
    route: "/round/:id",
    controller: RoundsController,
    action: "one",
  },
  {
    method: "post",
    route: "/rounds",
    controller: RoundsController,
    action: "save",
  },
  {
    method: "get",
    route: "/metric/:metricKey/:userId",
    controller: MetricsController,
    action: "one",
  },
  {
    method: "post",
    route: "/metrics",
    controller: MetricsController,
    action: "some",
  },
  {
    method: "get",
    route: "/metrics/:userId",
    controller: MetricsController,
    action: "byUser",
  },
];
