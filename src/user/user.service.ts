import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';

import { User } from '../db/entities/user.entity';
import { _400 } from '../common/error/error.messages';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(options: FindOneOptions<User>) {
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new BadRequestException(_400.INVALID_CREDENTIALS);
    }
    return user;
  }

  async checkUserExists(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException(_400.INVALID_CREDENTIALS);
    }
    return user;
  }

  async saveUser(dto: any) {
    const newUser = this.userRepository.create({ ...dto });
    return await this.userRepository.save(newUser);
  }

  getCurrentUser(user: User) {
    return user;
  }
}
