import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppConfigService } from './app-config/app-config.service';
import { Environment } from './common/enums/common.enums';
import { getLogLevels } from './common/utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_DOCUMENTATION_PATH } from './common/constants/general.constants';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { nodeEnv, port } = app.get(AppConfigService);
  const isProductionEnvironment = nodeEnv === Environment.production;

  app.useLogger(getLogLevels(isProductionEnvironment));
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.use(helmet());

  swaggerDocumentation(app, '1.0.0');

  await app.listen(port ?? 3000);
}
bootstrap();

export const swaggerDocumentation = (
  app: INestApplication,
  version: string,
): void => {
  const config = new DocumentBuilder()
    .setTitle('Uptique Auth')
    .setDescription("Set of API's for uptique")
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });

  SwaggerModule.setup(SWAGGER_DOCUMENTATION_PATH, app, document);
};
