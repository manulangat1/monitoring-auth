import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagicLink } from '../db/entities/magic-link.entity';
import { User } from '../db/entities/user.entity';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class MagicLinksService {
  constructor(
    @InjectRepository(MagicLink)
    private readonly magicLinkRepository: Repository<MagicLink>,
  ) {}

  generateTokenHash(): string {
    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    return tokenHash;
  }

  async saveLink(user: User): Promise<MagicLink> {
    const token = this.generateTokenHash();
    const newToken = this.magicLinkRepository.create({
      user,
      tokenHash: token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    return await this.magicLinkRepository.save(newToken);
  }
}
