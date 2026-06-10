import { PickType } from '@nestjs/swagger';
import { SignUpDTO } from './sign-up.dto';

export class LoginDTO extends PickType(SignUpDTO, ['email']) {}
