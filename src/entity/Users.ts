import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  Timestamp,
} from "typeorm";
import { Metric } from "./Metric";
import { Rounds } from "./Round";
import { UserMetric } from "./UserMetric";

@Entity()
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  profilePic: string | null;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  registrationDate: Date;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Rounds, (round) => round.user)
  rounds: Rounds[];

  @OneToMany(() => UserMetric, (userMetric) => userMetric.user)
  userMetrics: UserMetric[];

  async save(): Promise<this> {
    await super.save();
    return this;
  }
}
