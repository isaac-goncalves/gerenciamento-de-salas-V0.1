import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Agendamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    horario_inicio: Date;

    @Column()
    horario_fim: Date;

    @Column()
    id_professor: string;

    @Column()
    id_grade: string;
    
    @Column()
    id_laboratorio: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    updated_at: Date;
}
