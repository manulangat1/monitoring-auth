import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { okResponse } from '../common/dto/ok-response';
import { AuthMethod } from '../common/enums/common.enums';
import { MagicLinksService } from '../magic-links/magic-links.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private magicLinkService: MagicLinksService,
  ) {}

  async singUp(dto: SignUpDTO) {
    const { email } = dto;
    // check whether the email already exists.
    const userExists = await this.userService.checkUserExists(email);

    // commit the user to the database.
    const user = this.userService.saveUser({
      ...dto,
      authType: AuthMethod.MAGIC_LINK,
    });

    // return a response back to the user
    // return okResponse();
    return user;
  }

  async singIn(dto: LoginDTO) {
    const { email } = dto;

    const userExists = await this.userService.getUser({
      where: {
        email,
      },
    });
    // implement rate limiting

    // generate magic Link.
    const token = await this.magicLinkService.saveLink(userExists);

    // return response back to the user.
    return okResponse('Check your email for the magic link!');
  }
}
