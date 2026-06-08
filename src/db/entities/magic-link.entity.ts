import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MagicLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  @Index()
  tokenHash: string;

  @Column()
  expiresAt: Date;

  @Column({ nullable: true })
  usedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   many to one rlship to the User entity.
  @ManyToOne(() => User, (user) => user.magicLinks)
  user: User;
}
