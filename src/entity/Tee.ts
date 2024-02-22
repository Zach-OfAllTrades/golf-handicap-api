// tees.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Courses } from "./Course";
import { Rounds } from "./Round";

@Entity()
export class Tees extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  teeName: string;

  @Column()
  rating: number;

  @Column()
  slope: number;

  @Column()
  yardage: number;

  @Column()
  par: number;

  @ManyToOne(() => Courses, (course) => course.tees)
  @JoinColumn({ name: "courseId" })
  course: Courses;

  @OneToMany(() => Rounds, (round) => round.tee)
  rounds: Rounds[];
}
