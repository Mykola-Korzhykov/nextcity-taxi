import { Injectable } from '@nestjs/common'

import Context from './interfaces/context.interface'

@Injectable()
export class AppService {
  async startCommand(ctx: Context) {
    await ctx.reply('START!')
  }

  async apply() {
    return 'Apply'
  }
}
