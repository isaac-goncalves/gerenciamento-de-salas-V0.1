
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Funcionarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    degree: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    zip: string;

    @CreateDateColumn()
    created_at: Date;

    //store user avatar

    @Column()
    updated_at: Date;
   
}