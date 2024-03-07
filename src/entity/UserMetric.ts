import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import Users from "./Users";
import { Metric } from "./Metric";

@Entity()
export class UserMetric extends BaseEntity {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  metric_id: number;

  @ManyToOne(() => Users, (user) => user.userMetrics, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: Users;

  @ManyToOne(() => Metric, (metric) => metric.userMetrics)
  @JoinColumn({ name: "metric_id" })
  metric: Metric;
}
