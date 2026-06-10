import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MagicLinksModule } from './magic-links/magic-links.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';

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
