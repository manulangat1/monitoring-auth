import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagicLink } from '../db/entities/magic-link.entity';
import { User } from '../db/entities/user.entity';
import { createHash, randomBytes } from 'crypto';
import { _400 } from '../common/error/error.messages';

@Injectable()
export class MagicLinksService {
  constructor(
    @InjectRepository(MagicLink)
    private readonly magicLinkRepository: Repository<MagicLink>,
  ) {}

  generateTokenHash() {
    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    return { tokenHash, token };
  }

  async saveLink(user: User): Promise<string> {
    const { token, tokenHash } = this.generateTokenHash();
    const newToken = this.magicLinkRepository.create({
      user,
      tokenHash: tokenHash,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    await this.magicLinkRepository.save(newToken);
    return token;
  }
  async checkToken(token: string) {
    const hashed = createHash('sha256').update(token).digest('hex');
    const tokenExists = await this.magicLinkRepository.findOne({
      where: {
        tokenHash: hashed,
      },
      relations: { user: true },
    });

    if (!tokenExists) throw new BadRequestException(_400.INVALID_CREDENTIALS);

    if (tokenExists?.usedAt)
      throw new BadRequestException(_400.INVALID_CREDENTIALS);

    // check if token is already expired.
    if (tokenExists.expiresAt < new Date())
      throw new BadRequestException(_400.INVALID_CREDENTIALS);

    return tokenExists;
  }

  async markAsUsed(id: number): Promise<void> {
    await this.magicLinkRepository.update(
      {
        id,
      },
      { usedAt: new Date() },
    );
  }
}
