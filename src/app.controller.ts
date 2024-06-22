import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBody,
  ApiProperty,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger'
import { AppService } from './app.service'

import { ApplicationDto } from './dto/application.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('application')
  @ApiTags('Applications')
  @ApiOperation({ summary: 'Send new application to operator' })
  @ApiResponse({
    status: 201,
    type: ApplicationDto,
    description: 'If the request is successful, returns a new application.',
  })
  async apply(@Body() data: ApplicationDto) {
    return await this.appService.apply(data)
  }
}
