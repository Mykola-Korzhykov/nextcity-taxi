import { Injectable } from '@nestjs/common'

import { InjectBot } from 'nestjs-telegraf'
import Context from './interfaces/context.interface'
import { Telegraf } from 'telegraf'
import { Markup } from 'telegraf'

import { OrderDto } from './dto/order.dto'

@Injectable()
export class AppService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}
  async startCommand(ctx: Context) {
    await ctx.reply('START!')
  }

  async createOrder(data: OrderDto) {
    await this.bot.telegram.sendMessage(
      '-1002217726082',
      '2',
      Markup.inlineKeyboard([
        [Markup.button.callback('Подтвердить', 'confirmOrder')],
        [Markup.button.callback('Отменить', 'cancelOrder')],
      ]),
    )

    return data
  }
}
