import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Disciplinas {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    descricao: string;

}