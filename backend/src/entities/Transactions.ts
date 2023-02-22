
import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne, CreateDateColumn, JoinColumn} from "typeorm"

import { Accounts } from "./Accounts"

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Accounts, account => account.id)  
    @JoinColumn()
    debitedAccountid: Accounts

    @ManyToOne(() => Accounts, account => account.id)
    @JoinColumn()
    creditedAccountid: Accounts

    @Column()
    value: number

    @CreateDateColumn()
    created_at: Date;
}