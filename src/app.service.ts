import { Injectable } from '@nestjs/common'

import Context from './interfaces/context.interface'

import { ApplicationDto } from './dto/application.dto'

@Injectable()
export class AppService {
  async startCommand(ctx: Context) {
    await ctx.reply('START!')
  }

  async apply(data: ApplicationDto) {
    return data
  }
}
