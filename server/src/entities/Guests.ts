import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm'

@Entity()
export class Guests {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  semester: string

  @Column({ nullable: true })
  course_id: number;

  @Column()
  email: string

  @Column({
    nullable: true
  })
  user_id: number

  @CreateDateColumn()
  created_at: Date

  @Column()
  updated_at: Date
}
