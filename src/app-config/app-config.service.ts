import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentDTO } from './dto/Environment.dto';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvironmentDTO>) {}

  get port(): number {
    return this.configService.getOrThrow('port');
  }

  get nodeEnv(): string {
    return this.configService.getOrThrow('NODE_ENV');
  }
}
