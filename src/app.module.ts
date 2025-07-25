import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guard/jwt.guard';
import { CalendarModule } from './calendar/calendar.module';
import { CountriesNowModule } from './integrations/countries-now/countries-now.module';
import { DatenagerModule } from './integrations/date-nager/datenager.module';
import { MixedIntegrationModule } from './integrations/mixed/mixed-integration.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        synchronize: false,
        autoLoadEntities: true,
        cli: {
          migrationsDir: 'migrations',
        },
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/**/*{.ts,.js}'],
        migrationsRun: false,
        migrationsTableName: 'migrations',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    DatenagerModule,
    CountriesNowModule,
    MixedIntegrationModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
