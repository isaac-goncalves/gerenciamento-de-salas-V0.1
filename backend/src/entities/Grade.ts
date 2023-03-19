import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    horario_inicio: Date;

    @Column()
    horario_fim: Date;

    @Column()
    id_professor: string;

    @Column()
    id_disciplina: string;

    @Column()
    id_sala: string;

    @Column()
    semestre: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    updated_at: Date;
}
