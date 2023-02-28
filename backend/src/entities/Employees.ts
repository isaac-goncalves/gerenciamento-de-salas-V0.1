
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Users } from "./Users";

@Entity()
export class Employees {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    class_name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zip: string;

    @OneToOne(() => Users)
    @JoinColumn()
    user_id: Users;

    @CreateDateColumn()
    created_at: Date;

    //store user avatar

    @Column()
    updated_at: Date;

}