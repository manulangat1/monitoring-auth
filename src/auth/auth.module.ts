import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MagicLinksModule } from '../magic-links/magic-links.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: 6379,
          password: process.env.REDIS_PASSWORD,
          tls: {},
        },
      },
    ]),
    UserModule,
    MagicLinksModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
