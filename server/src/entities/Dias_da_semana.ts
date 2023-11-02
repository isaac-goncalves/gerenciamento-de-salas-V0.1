import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Dias_da_semana  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dia_da_semana: string;

    @Column({nullable: true} )
    course_id: number;

}
