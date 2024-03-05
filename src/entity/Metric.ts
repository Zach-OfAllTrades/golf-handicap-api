import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tees } from "./Tee";
import Users from "./Users";

@Entity()
export class Metric extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  key: string;

  @Column()
  title: string;
}
