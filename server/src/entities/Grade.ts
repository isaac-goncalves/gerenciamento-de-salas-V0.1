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
    dia_da_semana: number;

    @Column({
        type: 'integer',
        nullable: true // sets the column to allow NULL as a valid value
    })
    id_professor: number;

    @Column({
        type: 'integer',
        nullable: true // sets the column to allow NULL as a valid value
    })
    id_disciplina: number;

    @Column()
    semestre: number;

    @Column()
    id_sala: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    updated_at: Date;
}
