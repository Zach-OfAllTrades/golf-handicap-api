import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import Users from "./Users";
import { Tees } from "./Tee";

@Entity()
export class Rounds extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  score: number;

  @Column()
  ags: number;

  @Column()
  date: Date;

  @ManyToOne(() => Users, (user) => user.rounds)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Tees, (tee) => tee.rounds)
  @JoinColumn({ name: "teeId" })
  tee: Tees;

  @Column({ nullable: true })
  detailsId: string; // Assuming this is a foreign key to another table
}
