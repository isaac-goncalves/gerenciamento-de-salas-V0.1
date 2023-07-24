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
  static id_professor(id_professor: any) {
    throw new Error('Method not implemented.')
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: Date

  @Column()
  horario_inicio: string

  @Column()
  horario_fim: string

  @Column()
  id_professor: number

  @Column()
  uuid_agendamento: string

  @Column()
  id_grade: string

  @Column()
  id_laboratorio: string

  @CreateDateColumn()
  created_at: Date

  @Column()
  updated_at: Date

  @ManyToOne(() => Professores, professor => professor.agendamentos)
  @JoinColumn({ name: 'id_professor' }) // the name of the column in your DB
  professor: Professores
}