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
export class ProfessoresCursos{
  static id_professor(id_professor: any) {
    throw new Error('Method not implemented.')
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  id_professor: number

  @Column({ nullable: true })
  course_id: number;

  @ManyToOne(() => Professores, professor => professor.agendamentos)
  @JoinColumn({ name: 'id_professor' }) // the name of the column in your DB
  professor: Professores
}
