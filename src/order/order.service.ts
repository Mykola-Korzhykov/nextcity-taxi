import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Status, tariffLabels } from 'types/order.types'
import { OrderDto } from 'dto/order.dto'
import { PatchOrderDto } from 'dto/patchOrder.dto'
import { InjectModel } from 'nestjs-typegoose'
import { InjectBot } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'
import Context from 'interfaces/context.interface'
import { ConfigService } from '@nestjs/config'
import formatDate from 'helpers/formatDate'
import formatAddresses from 'helpers/formatAddresses'
import formatOptions from 'helpers/formatOptions'
import { formatStatus } from 'helpers/formatStatus'
import orderButtons from 'app.buttons'
import createOrderInfo from 'helpers/createOrderInfo'

const generateUniqueId = require('generate-unique-id')
import { DateTime } from 'luxon'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderDto)
    private readonly orderModel: ModelType<OrderDto>,
    private readonly configService: ConfigService,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  private readonly CHANNEL_ID = this.configService.get<string>('CHANNEL_ID')

  async createOrder(orderData: OrderDto): Promise<OrderDto> {
    const orderId = generateUniqueId({
      length: 6,
      useNumbers: true,
      useLetters: false,
    })

    this.bot.telegram.sendMessage(
      this.CHANNEL_ID,
      createOrderInfo({ orderId, ...orderData }),
      orderButtons(),
    )

    return await this.orderModel.create({ orderId, ...orderData })
  }

  async findOrder(orderId: number): Promise<OrderDto> {
    const order = await this.orderModel.findOne({ orderId })

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`)
    }

    return order
  }

  async findAllOrders(): Promise<OrderDto[]> {
    return await this.orderModel.find()
  }

  async updateOrder(orderData: PatchOrderDto): Promise<PatchOrderDto> {
    const { orderId, price, car, driver, status, tariff } = orderData

    if (!orderId) {
      throw new BadRequestException('Order ID missed in body request')
    }

    const order = await this.orderModel.findOne({ orderId })

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${orderData.orderId} not found`,
      )
    }

    if (driver || car || price || tariff) {
      orderData.status = Status.CONFIRMED
    }

    if (status) orderData.status = status

    await order.updateOne(orderData)
    return await this.orderModel.findOne({ orderId })
  }

  async deleteOrder(orderId): Promise<OrderDto> {
    const order = await this.orderModel.findOneAndDelete({ orderId }).exec()

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`)
    }

    return order
  }
}
