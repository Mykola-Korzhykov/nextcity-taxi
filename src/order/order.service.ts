import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Status } from 'types/order.types'
import { OrderDto } from 'dto/order.dto'
import { PatchOrderDto } from 'dto/patchOrder.dto'
import { InjectModel } from 'nestjs-typegoose'
const generateUniqueId = require('generate-unique-id')

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderDto)
    private readonly orderModel: ModelType<OrderDto>,
  ) {}

  async createOrder(orderData: OrderDto): Promise<OrderDto> {
    const orderId = generateUniqueId({
      length: 6,
      useNumbers: true,
      useLetters: false,
    })

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
    const { orderId, price, car, driver, status } = orderData

    if (!orderId) {
      throw new BadRequestException('Order ID missed in body request')
    }

    const order = await this.orderModel.findOne({ orderId })

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${orderData.orderId} not found`,
      )
    }

    if (driver || car || price) {
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
