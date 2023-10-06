import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ProfessorDisciplina {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_professor: number

    @Column()
    id_disciplina: number;
}
