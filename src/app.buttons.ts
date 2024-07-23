import { Markup } from 'telegraf'

const orderButtons = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('✅ Подтвердить', 'confirmOrder')],
    [Markup.button.callback('❌ Отменить', 'cancelOrder')],
    [Markup.button.callback('☑️ Завершить', 'finishOrder')],
    [Markup.button.callback('🔄 Обновить', 'updateOrder')],
  ])
}

export default orderButtons
