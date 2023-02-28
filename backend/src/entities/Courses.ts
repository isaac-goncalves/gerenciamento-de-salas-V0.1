import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}