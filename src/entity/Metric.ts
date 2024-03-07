import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { UserMetric } from "./UserMetric";

@Entity()
export class Metric extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  key: string;

  @Column()
  title: string;

  @OneToMany(() => UserMetric, (userMetric) => userMetric.user)
  userMetrics: UserMetric[];
}
