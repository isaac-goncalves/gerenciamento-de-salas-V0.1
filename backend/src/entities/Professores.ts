import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm'

@Entity()
export class Professores {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    nullable: true
  })
  surname: string

  @Column({
    nullable: true
  })
  email: string

  @Column({
    nullable: true
  })
  user_id: number

  @Column({
    nullable: true
  })
  disciplina: number

  @Column({
    nullable: true
  })
  created_at: Date

  @Column({
    nullable: true
  })
  updated_at: Date
}
