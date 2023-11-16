import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm'

import { Professores } from './Professores'

@Entity()
export class Agendamento {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: Date

  @Column({ nullable: true })
  horario_inicio: string

  @Column({ nullable: true })
  horario_fim: string

  @Column()
  id_professor: number

  @Column()
  uuid_agendamento: string

  @Column()
  id_grade: number

  @Column({ nullable: true })
  course_id: number;

  @Column({ nullable: true })
  id_laboratorio: number

  @Column()
  schedule_status: string

  @CreateDateColumn()
  created_at: Date

  @Column()
  updated_at: Date

}
