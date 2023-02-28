import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Schedules {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    start_time: Date;

    @Column()
    end_time: Date;

    @Column()
    class_id: string;

    @Column()
    professor_id: string;

    @Column()
    capacity: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    updated_at: Date;
}
