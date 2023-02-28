import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Logs {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Users)
    @JoinColumn()
    user_id: Users;

    @Column()
    action: string;

    @Column()
    date: Date;
}