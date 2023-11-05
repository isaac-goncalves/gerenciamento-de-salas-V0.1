import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Laboratorios  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    numero_sala: number;

    @Column()
    descricao: string;

    @Column()
    andar: number;

    @Column()
    capacidade: number;

}
