import { BadRequestException, Injectable, Param, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { okResponse } from '../common/dto/ok-response';
import { AuthMethod } from '../common/enums/common.enums';
import { MagicLinksService } from '../magic-links/magic-links.service';
import { LoginDTO } from './dto/login.dto';
import { User } from '../db/entities/user.entity';
import { _400 } from '../common/error/error.messages';
import { JwtService } from '@nestjs/jwt';
import { LoginObjectDTO } from '../common/dto/login-response.dto';
import { plainToInstance } from 'class-transformer';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private magicLinkService: MagicLinksService,
    private jwtService: JwtService,
    private dataSource: DataSource,
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
    return okResponse(token);
  }

  async verifyToken(token: string): Promise<any> {
    const tokenExists = await this.magicLinkService.checkToken(token);

    //  invalidate the token by having used at.
    if (!tokenExists) {
      throw new BadRequestException(_400.INVALID_CREDENTIALS);
    }

    await this.magicLinkService.markAsUsed(tokenExists.id);

    // generate jwt token here
    const accessToken = await this.generateAccessToken(tokenExists.user);
    const data: LoginObjectDTO = plainToInstance(
      LoginObjectDTO,
      tokenExists.user,
    );
    return this.generateLoginResponse(data, accessToken);

    // return tokenExists?.user;
  }

  generateAccessToken = async (user: User): Promise<string> => {
    const payload = { sub: user };
    return await this.jwtService.signAsync(payload);
  };
  generateLoginResponse(data: LoginObjectDTO, accessToken: string) {
    return {
      message: 'Login Success',
      data,
      accessToken,
    };
  }
}
