import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  Timestamp,
} from "typeorm";
import { Rounds } from "./Round";

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

  async save(): Promise<this> {
    await super.save();
    return this;
  }
}
