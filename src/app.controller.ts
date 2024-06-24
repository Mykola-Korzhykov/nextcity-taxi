import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBody,
  ApiProperty,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger'
import { AppService } from './app.service'

import { OrderDto } from './dto/order.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('order')
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Send new order to operator' })
  @ApiResponse({
    status: 201,
    type: OrderDto,
    description: 'If the request is successful, returns a new order.',
  })
  async createOrder(@Body() data: OrderDto) {
    return await this.appService.createOrder(data)
  }
}
