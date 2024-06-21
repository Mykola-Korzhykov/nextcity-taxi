import { Body, Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'

import { ApplicationDto } from './dto/application.dto'
import { Throttle } from '@nestjs/throttler'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('apply')
  async apply(@Body() data: ApplicationDto) {
    return await this.appService.apply(data)
  }
}
