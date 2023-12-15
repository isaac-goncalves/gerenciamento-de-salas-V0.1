import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MensagemTemporaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  expiryDate: Date; // Nullable field for expiry date
}