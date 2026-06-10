import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });
const isRemote = process.env.REMOTE_HOST === 'true';
const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: Number(`${process.env.DATABASE_PORT}`),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  seeds: ['dist/db/seeds/**/*.js'],
  factories: ['dist/db/factories/**/*.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  entities: ['dist/db/entities/**/*.entity.js'],
  autoLoadEntities: true,
  synchronize: false,

  ...(isRemote && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
