import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MagicLinksModule } from './magic-links/magic-links.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AppConfigModule,
    AuthModule,
    UserModule,
    MagicLinksModule,
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
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
