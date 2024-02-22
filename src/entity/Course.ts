import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Tees } from "./Tee";

@Entity()
export class Courses extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  courseName: string;

  @Column()
  displayName: string;

  @Column()
  location: string;

  @OneToMany(() => Tees, (tee) => tee.course)
  tees: Tees[];
}
