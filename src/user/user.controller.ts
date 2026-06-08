import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../common/decorators/Current-user.decorator';
import { User } from '../db/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getCurrentUser(@CurrentUser() user: User) {
    return await this.userService.getCurrentUser(user);
  }
}
