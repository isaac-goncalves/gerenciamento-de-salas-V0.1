import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm'

@Entity()
export class Disciplinas {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  descricao: string
  
  @Column({ nullable: true })
  course_id: number;

  @Column({ type: 'integer', default: 30, nullable: true })
  capacidade: number
}
