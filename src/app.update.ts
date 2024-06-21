import { OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { InjectBot, Start, Update } from 'nestjs-telegraf'

import { Telegraf } from 'telegraf'

import { AppService } from './app.service'

import Context from './interfaces/context.interface'

@Update()
export class AppUpdate implements OnModuleInit {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  onModuleInit() {}

  private readonly CHANNEL_ID = this.configService.get<string>('CHANNEL_ID')

  @Start()
  async startCommand(ctx: Context) {
    const currentChatId = String(ctx.chat.id)

    ctx.session.userId = Number(ctx.from.id)

    this.appService.startCommand(ctx)
  }
}
