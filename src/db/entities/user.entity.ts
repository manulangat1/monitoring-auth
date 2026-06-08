import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt } from 'bcrypt';
import { hashPassword } from '../../common/lib/auth';
import { AuthMethod } from '../../common/enums/common.enums';
import { MagicLink } from './magic-link.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column('varchar', { select: false, nullable: true })
  password: string;

  @Column({ select: false, nullable: true })
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   add enum for auth method here.
  @Column({
    // type: enum,
    enum: AuthMethod,
  })
  authType: AuthMethod;

  @OneToMany(() => MagicLink, (magicLink) => magicLink.user)
  magicLinks: MagicLink[];

  @BeforeInsert()
  private async generateSaltAndHash?(): Promise<void> {
    if (this.authType === AuthMethod.PASSWORD && this.password) {
      this.salt = await genSalt();
      this.password = await hashPassword(this.password, this.salt);
    }
  }
}
