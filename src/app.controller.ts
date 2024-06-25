import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import {
  ApiBody,
  ApiProperty,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger'
import { AppService } from './app.service'

import { OrderDto } from './dto/order.dto'
import { OrderService } from 'order/order.service'
import { PatchOrderDto } from 'dto/patchOrder.dto'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly orderService: OrderService,
  ) {}

  @Post('order')
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Send new order to operator' })
  @ApiResponse({
    status: 201,
    type: OrderDto,
    description: 'If the request is successful, returns a new order.',
  })
  async createOrder(@Body() data: OrderDto) {
    return await this.orderService.createOrder(data)
  }

  @Get('order/:id')
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Find order by ID' })
  @ApiResponse({
    status: 200,
    type: OrderDto,
    description: 'Returns a order.',
  })
  async findOrder(@Param('id') orderId: number) {
    return await this.orderService.findOrder(orderId)
  }

  @Get('order')
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Find all orders' })
  @ApiResponse({
    status: 200,
    type: OrderDto,
    description: 'Returns all orders.',
  })
  async findAllOrders() {
    return await this.orderService.findAllOrders()
  }

  @Patch('order')
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiResponse({
    status: 200,
    type: OrderDto,
    description: 'Returns a updated order.',
  })
  async updateOrder(@Body() data: PatchOrderDto) {
    return await this.orderService.updateOrder(data)
  }

  @Delete('order/:id')
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiResponse({
    status: 200,
    type: OrderDto,
    description: 'Delete a order.',
  })
  async deleteOrder(@Param('id') orderId: number) {
    return await this.orderService.deleteOrder(orderId)
  }
}
