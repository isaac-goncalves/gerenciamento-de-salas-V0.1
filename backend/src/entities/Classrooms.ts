import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Classrooms  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    updated_at: Date;
}
