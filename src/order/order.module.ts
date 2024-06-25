import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderDto } from 'dto/order.dto'
import { Car, Driver, Field, Option } from 'types/order.types'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: OrderDto,
        schemaOptions: {
          collection: 'Order',
        },
      },
    ]),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
