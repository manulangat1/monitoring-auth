import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('typeorm');

        return config;
      },
    }),
  ],

  controllers: [],
  providers: [AppConfigService],
})
export class AppConfigModule {}
