import { Injectable } from '@nestjs/common'

import { InjectBot } from 'nestjs-telegraf'
import Context from './interfaces/context.interface'
import { Telegraf } from 'telegraf'
import { Markup } from 'telegraf'

import { OrderDto } from './dto/order.dto'
import parseArgs from 'helpers/parseArgs'
import { OrderService } from 'order/order.service'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { statusList, updateStatusMessage } from 'helpers/formatStatus'
import orderButtons from 'app.buttons'
import { isValidTariff, Status } from './types/order.types'
import { ConfigService } from '@nestjs/config'
import extractOrderId from 'helpers/extractOrderId'
import { infoLabels, updateDriverInfo } from 'helpers/formatDriver'
import createOrderInfo from 'helpers/createOrderInfo'
import extractNumber from 'helpers/extractNumber'

type ModeType = 'all' | 'unfinished'

@Injectable()
export class AppService {
  orderService: any
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
    @InjectModel(OrderDto)
    private readonly orderModel: ModelType<OrderDto>,
  ) {}

  private readonly CHANNEL_ID = this.configService.get<string>('CHANNEL_ID')
  private readonly OWNER_PASSWORD =
    this.configService.get<string>('OWNER_PASSWORD')

  async getOrder(ctx: Context) {
    const args = parseArgs(ctx.payload)

    const orderId = args[0]

    if (orderId) {
      const order = await this.orderModel.findOne({ orderId })
      if (!order) {
        ctx.reply(`🚫 Заказа с таким ID не существует (🆔 ${orderId})`)
        return false
      }

      ctx.reply(createOrderInfo(order))
    } else {
      ctx.reply(
        '🚫 Некорректный синтаксис.\n\n📝 Используйте: /getOrder ID заказа',
      )
    }
  }

  async deleteOrder(ctx: Context) {
    const args = parseArgs(ctx.payload)

    const orderId = args[0]

    if (orderId) {
      const order = await this.orderModel.findOne({ orderId })
      if (!order) {
        ctx.reply(`🚫 Заказа с таким ID не существует (🆔 ${orderId})`)
        return false
      }

      await order.deleteOne()

      ctx.reply(`✅ Заказ был успешно удалён из базы данных! (🆔 ${orderId})`)
    } else {
      ctx.reply(
        '🚫 Некорректный синтаксис.\n\n📝 Используйте: /deleteOrder ID заказа',
      )
    }
  }

  async dropOrders(ctx: Context) {
    const args = parseArgs(ctx.payload)
    const password = args[0]

    if (!password) {
      ctx.reply(
        '🚫 Некорректный синтаксис.\n\n📝 Используйте: /dropOrders Пароль',
      )
      return false
    }

    if (password === this.OWNER_PASSWORD) {
      await this.orderModel.deleteMany({})
      ctx.reply(`✅ Коллекция заказов была очищена!`)
    } else {
      ctx.reply(`🚫 Неверный пароль!`)
    }
  }

  async parseOrders(ctx: Context) {
    const args = parseArgs(ctx.payload)
    const mode: ModeType = args[0]

    if (!mode) {
      ctx.reply(
        '🚫 Некорректный синтаксис.\n\n📝 Используйте: /parseOrders all / unfinished',
      )
      return false
    }

    if (mode === 'all') {
      const orders = await this.orderModel.find()

      if (orders.length === 0) {
        ctx.reply('🚫 Нет заказов')
        return false
      }

      orders.forEach((order) => {
        const keyboard: any =
          order.status !== Status.FINISHED ? orderButtons() : ''

        this.bot.telegram.sendMessage(
          this.CHANNEL_ID,
          createOrderInfo(order),
          keyboard,
        )
      })

      return false
    }

    if (mode === 'unfinished') {
      const orders = await this.orderModel.find()

      let orderCounter = 0
      orders.forEach((order) => {
        if (order.status !== Status.FINISHED) {
          this.bot.telegram.sendMessage(
            this.CHANNEL_ID,
            createOrderInfo(order),
            orderButtons(),
          )

          ctx.reply(`✅ Не завершенные заказы были добавлены в канал!`)
          orderCounter += 1
        }
      })

      if (orderCounter > 0) {
        ctx.reply(`✅ Все заказы были добавлены в канал!`)
      } else {
        ctx.reply(`🚫 Нет не завершенных заказов!`)
      }

      return false
    }

    ctx.reply(
      '🚫 Некорректный синтаксис.\n\n📝 Используйте: /parseOrders all / unfinished',
    )
  }

  async changeOrderStatus(ctx: Context, status: Status) {
    const { message_id, text } = ctx.update.callback_query.message

    const keyboard: any = status !== Status.FINISHED ? orderButtons() : ''

    const newText = updateStatusMessage(text, statusList[status])
    if (newText === text) return false

    this.bot.telegram.editMessageText(
      this.CHANNEL_ID,
      message_id,
      undefined,
      updateStatusMessage(text, statusList[status]),
      keyboard,
    )

    const orderId = extractOrderId(text)
    const order = await this.orderModel.findOne({ orderId })
    if (!order) {
      ctx.deleteMessage()
      return false
    }

    await order.updateOne({ status })
  }

  async updateOrderInfo(ctx: Context) {
    const { message_id, text } = ctx.update.callback_query.message

    const orderId = extractOrderId(text)
    const order = await this.orderModel.findOne({ orderId })
    if (!order) {
      ctx.deleteMessage()
      return false
    }

    const keyboard: any = order.status !== Status.FINISHED ? orderButtons() : ''

    const orderInfo = createOrderInfo(order)
    if (orderInfo === text) return false

    this.bot.telegram.editMessageText(
      this.CHANNEL_ID,
      message_id,
      undefined,
      orderInfo,
      keyboard,
    )
  }

  async setDriver(ctx: Context) {
    const args = parseArgs(ctx.payload)

    const orderId = args[0],
      driverName = args[1],
      driverPhone = args[2]

    if (orderId) {
      const order = await this.orderModel.findOne({ orderId })
      if (!order) {
        ctx.reply(`🚫 Заказа с таким ID не существует (🆔 ${orderId})`)
        return false
      }

      if (order.status === Status.FINISHED) {
        ctx.reply(`☑️ Заказ уже завершён (🆔 ${orderId})`)
        return false
      }

      const driver: any = {}
      if (driverName) driver.name = driverName
      if (driverPhone) driver.phone = driverPhone

      if (!driverName && !driverPhone) {
        ctx.reply('🚫 Заполните информацию о водителе!')
        return false
      }

      await order.updateOne({ driver, status: Status.CONFIRMED })

      ctx.reply(
        `✅ Информация о заказе успешно обновлена!\n${driverName ? `\n${infoLabels['driverName']}: ${driverName}` : ''}\n${driverPhone ? `${infoLabels['driverPhone']}: ${driverPhone}\n` : ''}\n🆔 ID заказа: ${orderId}`,
      )
    } else {
      ctx.reply(
        '🚫 Некорректный синтаксис.\n\n📝 Используйте: /setDriver ID заказа/Имя водителя/Номер водителя',
      )
    }
  }

  async setCar(ctx: Context) {
    const args = parseArgs(ctx.payload)

    const orderId = args[0],
      carColor = args[1],
      carModel = args[2],
      carLicensePlate = args[3]

    if (orderId) {
      const order = await this.orderModel.findOne({ orderId })
      if (!order) {
        ctx.reply(`🚫 Заказа с таким ID не существует (🆔 ${orderId})`)
        return false
      }

      if (order.status === Status.FINISHED) {
        ctx.reply(`☑️ Заказ уже завершён (🆔 ${orderId})`)
        return false
      }

      const car: any = {}
      if (carModel) car.model = carModel
      if (carColor) car.color = carColor
      if (carLicensePlate) car.licensePlate = carLicensePlate

      if (!carModel && !carColor && !carLicensePlate) {
        ctx.reply('🚫 Заполните информацию о автомобиле!')
        return false
      }

      await order.updateOne({ car, status: Status.CONFIRMED })

      ctx.reply(
        `✅ Информация о заказе успешно обновлена!\n${carColor ? `\n${infoLabels['carColor']}: ${carColor}` : ''}\n${carModel ? `${infoLabels['carModel']}: ${carModel}\n` : ''}${carLicensePlate ? `${infoLabels['carLicensePlate']}: ${carLicensePlate}\n` : ''}\n🆔 ID заказа: ${orderId}`,
      )
    } else {
      ctx.reply(
        '🚫 Некорректный синтаксис.\n\n📝 Используйте: /setCar ID заказа/Цвет автомобиля/Модель автомобиля/Гос.знак',
      )
    }
  }

  async setPrice(ctx: Context) {
    const args = parseArgs(ctx.payload)

    const orderId = args[0],
      price = args[1]

    if (orderId) {
      const order = await this.orderModel.findOne({ orderId })

      if (!order) {
        ctx.reply(`🚫 Заказа с таким ID не существует (🆔 ${orderId})`)
        return false
      }

      if (order.status === Status.FINISHED) {
        ctx.reply(`☑️ Заказ уже завершён (🆔 ${orderId})`)
        return false
      }

      if (!price) {
        ctx.reply('🚫 Введите цену за заказ!')
        return false
      }

      await order.updateOne({
        price: extractNumber(price),
        status: Status.CONFIRMED,
      })

      ctx.reply(
        `✅ Информация о заказе успешно обновлена!\n${price ? `\n💲 Цена: ${price}\n` : ''}\n🆔 ID заказа: ${orderId}`,
      )
    } else {
      ctx.reply(
        '🚫 Некорректный синтаксис.\n\n📝 Используйте: /setPrice ID заказа/Цена',
      )
    }
  }

  async setTariff(ctx: Context) {
    const args = parseArgs(ctx.payload)

    const orderId = args[0],
      tariff = args[1]

    if (orderId) {
      const order = await this.orderModel.findOne({ orderId })

      if (!order) {
        ctx.reply(`🚫 Заказа с таким ID не существует (🆔 ${orderId})`)
        return false
      }

      if (order.status === Status.FINISHED) {
        ctx.reply(`☑️ Заказ уже завершён (🆔 ${orderId})`)
        return false
      }

      if (!tariff) {
        ctx.reply('🚫 Выберите тариф!')
        return false
      }

      if (!isValidTariff(tariff)) {
        ctx.reply('🚫 Доступны только эти тарифы (economy, comfort, business)!')
        return false
      }

      await order.updateOne({ tariff, status: Status.CONFIRMED })

      ctx.reply(
        `✅ Информация о заказе успешно обновлена!\n${tariff ? `\n🚕 Тариф: ${tariff}\n` : ''}\n🆔 ID заказа: ${orderId}`,
      )
    } else {
      ctx.reply(
        '🚫 Некорректный синтаксис.\n\n📝 Используйте: /setTariff ID заказа/Тариф (economy, comfort, business)',
      )
    }
  }

  async checkOrders(mode: 'date' | 'time') {
    const orders = await this.orderModel.find()
    const currentDate = new Date()

    if (mode === 'date') {
      orders.forEach(async (order) => {
        const orderId = order.orderId
        const inputDate = new Date(order.createdAt)

        const timeDifference = currentDate.getTime() - inputDate.getTime()
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24)

        if (dayDifference >= 30) {
          // 30 days
          await this.orderModel.deleteOne({ orderId })
        }
      })
    }

    if (mode === 'time') {
      orders.forEach(async (order) => {
        const orderId = order.orderId
        const inputDate = new Date(order.createdAt)

        const timeDifference = currentDate.getTime() - inputDate.getTime()
        const hourDifference = timeDifference / (1000 * 60 * 60)

        if (order.status === Status.CONFIRMED && hourDifference >= 1) {
          // 1 hour
          this.orderModel.updateOne({ orderId }, { status: Status.FINISHED })
        }

        if (order.status === Status.WAIT && hourDifference >= 1) {
          // 1 hour
          this.orderModel.updateOne({ orderId }, { status: Status.CANCELLED })
        }
      })
    }
  }

  async runCheckOrders() {
    await this.checkOrders('date')
    await this.checkOrders('time')

    setInterval(async () => {
      await this.checkOrders('date')
    }, 43200000) // 12 hours

    setInterval(async () => {
      await this.checkOrders('time')
    }, 1800000) // 30 minutes
  }
}
