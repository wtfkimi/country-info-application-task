/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import { DataSource } from 'typeorm';

dotenv.config();
// for migrations only
export const typeormConfig = {
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD as string,
  port: Number(process.env.TYPEORM_PORT),
  host: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DATABASE,
  type: process.env.TYPEORM_TYPE as 'mysql',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'migrations',
  },
  synchronize: false,
  autoLoadEntities: true,
};

export default new DataSource(typeormConfig);
