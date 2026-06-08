import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MagicLinksModule } from '../magic-links/magic-links.module';

@Module({
  imports: [UserModule, MagicLinksModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
