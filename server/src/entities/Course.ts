import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    course_name: string;
    
    @Column()
    periodo: string;
}
