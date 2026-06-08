import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @ApiProperty({
    example: 'online@hello.com',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;
}
