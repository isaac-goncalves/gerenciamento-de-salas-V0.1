import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    horario_inicio: string;

    @Column()
    horario_fim: string;

    @Column()
    id_professor: string;

    @Column()
    dia_da_semana: string;

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
