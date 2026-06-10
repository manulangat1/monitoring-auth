import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../config';
import { JwtModule } from '@nestjs/jwt';

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
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('jwtSecretKey');
        const expiresIn = configService.get('jwtExpiresIn');

        return {
          secret: configService.getOrThrow('jwtSecretKey'),
          signOptions: { expiresIn: configService.getOrThrow('jwtExpiresIn') },
        };
      },
    }),
  ],

  controllers: [],
  providers: [AppConfigService],
  exports: [JwtModule],
})
export class AppConfigModule {}
