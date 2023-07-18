import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Semestres  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

}
