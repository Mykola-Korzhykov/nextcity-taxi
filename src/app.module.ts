import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppUpdate } from './app.update'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'

import { TypeOrmModule } from '@nestjs/typeorm'

import getTelegrafConfig from './config/telegraf.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRootAsync({
      imports: [],
      useFactory: getTelegrafConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [],
      database: process.env.POSTGRES_DB,
      synchronize: true,
      ssl: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
