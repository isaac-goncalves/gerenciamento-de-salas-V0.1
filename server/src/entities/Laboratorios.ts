import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Laboratorios  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @Column()
    andar: number;

    @Column()
    capacidade: number;

    @Column({ nullable: true })
    course_id: number;

}
