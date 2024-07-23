import { OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Action, Command, InjectBot, On, Start, Update } from 'nestjs-telegraf'

import { Telegraf } from 'telegraf'

import { AppService } from './app.service'

import Context from './interfaces/context.interface'

import parseArgs from 'helpers/parseArgs'
import parseArray from 'helpers/parseArray'
import { statusList, updateStatusMessage } from 'helpers/formatStatus'
import orderButtons from 'app.buttons'
import { Status } from './types/order.types'

@Update()
export class AppUpdate implements OnModuleInit {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  onModuleInit() {
    this.appService.runCheckOrders()
  }

  private readonly CHANNEL_ID = this.configService.get<string>('CHANNEL_ID')
  private readonly ADMINS = parseArray(
    this.configService.get<string[]>('ADMINS'),
  )

  @Start()
  async startCommand(ctx: Context) {
    const userId = ctx.from.id
    let access = false

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        ctx.reply('👋🏻 Привет, администратор!')
        access = true
      }
    })

    if (!access) ctx.reply('🚫 Доступ заблокирован!')
  }

  @Command('parse_orders')
  async parseOrders(ctx: Context) {
    const userId = ctx.from.id

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        this.appService.parseOrders(ctx)
        return
      }
    })
  }

  @Command('get_order')
  async getOrder(ctx: Context) {
    const userId = ctx.from.id

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        this.appService.getOrder(ctx)
        return
      }
    })
  }

  @Command('set_driver')
  async setDriver(ctx: Context) {
    const userId = ctx.from.id

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        this.appService.setDriver(ctx)
        return
      }
    })
  }

  @Command('set_car')
  async setCar(ctx: Context) {
    const userId = ctx.from.id

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        this.appService.setCar(ctx)
        return
      }
    })
  }

  @Command('set_price')
  async setPrice(ctx: Context) {
    const userId = ctx.from.id

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        this.appService.setPrice(ctx)
        return
      }
    })
  }

  @Command('set_tariff')
  async setTariff(ctx: Context) {
    const userId = ctx.from.id

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        this.appService.setTariff(ctx)
        return
      }
    })
  }

  @Command('delete_order')
  async deleteOrder(ctx: Context) {
    const userId = ctx.from.id

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        this.appService.deleteOrder(ctx)
        return
      }
    })
  }

  @Command('drop_orders')
  async dropOrders(ctx: Context) {
    const userId = ctx.from.id

    this.ADMINS.forEach((id) => {
      if (String(userId) === id) {
        this.appService.dropOrders(ctx)
        return
      }
    })
  }

  @Action('confirmOrder')
  async confirmOrder(ctx: Context) {
    this.appService.changeOrderStatus(ctx, Status.CONFIRMED)
  }

  @Action('cancelOrder')
  async cancelOrder(ctx: Context) {
    this.appService.changeOrderStatus(ctx, Status.CANCELLED)
  }

  @Action('finishOrder')
  async finishOrder(ctx: Context) {
    this.appService.changeOrderStatus(ctx, Status.FINISHED)
  }

  @Action('updateOrder')
  async updateOrder(ctx: Context) {
    this.appService.updateOrderInfo(ctx)
  }
}
