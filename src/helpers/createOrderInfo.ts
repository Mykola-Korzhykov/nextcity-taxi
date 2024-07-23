import { OrderDto } from 'dto/order.dto'
import formatAddresses from './formatAddresses'
import formatOptions from './formatOptions'
import { formatStatus } from './formatStatus'

import { infoLabels } from './formatDriver'
import formatDate from './formatDate'

const createOrderInfo = (order: OrderDto) => {
  const {
    orderId,
    tariff,
    price,
    phone,
    fields,
    driver,
    car,
    options,
    status,
  } = order

  const { driverName, driverPhone, carColor, carLicensePlate, carModel } =
    infoLabels

  const date = formatDate(new Date(order.date).toISOString()).split(' ')[0]
  const time = formatDate(new Date(order.time).toISOString()).split(' ')[1]
  return `🆔 ID заказа: ${orderId}\n\n🚕 Тариф: ${tariff}\n💲Цена: ${price} ₽\n📅 Дата: ${date}\n⏱️ Время: ${time}\n📞 Номер заказчика: ${phone}\n\n${formatAddresses(fields)}${`\n\n${driverName}: ${driver && driver.name ? driver.name : '---'}\n`}${`${driverPhone}: ${driver && driver.phone ? driver.phone : '---'}`}${`\n\n${carColor}: ${car && car.color ? car.color : '---'}\n`}${`${carModel}: ${car && car.model ? car.model : '---'}\n`}${`${carLicensePlate}: ${car && car.licensePlate ? car.licensePlate : '---'}`}\n\n${formatOptions(options)}\n\n${formatStatus(status)}`
}

export default createOrderInfo
