import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Alunos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname : string;

    @Column()
    email: string;

    @Column()
    user_id: number;

    @Column()
    semestre: number;

    @Column()
    course_id: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

}