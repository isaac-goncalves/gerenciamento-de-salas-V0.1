import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Professores {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome_completo: string;

    @Column({
        nullable: true,
    })
    id_perfil_usuario: number;


}