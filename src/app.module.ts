import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppUpdate } from './app.update'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'

import { TypeOrmModule } from '@nestjs/typeorm'

import getTelegrafConfig from './config/telegraf.config'
import { Car, Driver, Field, Option } from 'types/order.types'
import { OrderModule } from './order/order.module'
import { OrderService } from 'order/order.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from 'config/mongo.config'
import { OrderDto } from 'dto/order.dto'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRootAsync({
      imports: [],
      useFactory: getTelegrafConfig,
      inject: [ConfigService],
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    TypegooseModule.forFeature([
      {
        typegooseClass: OrderDto,
        schemaOptions: {
          collection: 'Order',
        },
      },
    ]),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
