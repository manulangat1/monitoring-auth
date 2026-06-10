import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign-up.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { Public } from '../common/decorators/Public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Implements sign up for user with auth type = magic link',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid data supplied' })
  async signUp(@Body() dto: SignUpDTO) {
    return await this.authService.singUp(dto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Implements login via magic link auth',
  })
  @ApiCreatedResponse({ description: 'Login success' })
  @ApiBadRequestResponse({ description: 'Bad request supplied' })
  async login(@Body() dto: LoginDTO) {
    return await this.authService.singIn(dto);
  }

  @Get('/verify/:token')
  // @ApiCreatedResponse({ description: 'Login success' })
  @ApiBadRequestResponse({ description: 'Bad request supplied' })
  async verifyToken(@Param('token') token: string) {
    return await this.authService.verifyToken(token);
  }
}
