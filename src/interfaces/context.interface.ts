import { Context as ContextTelegraf } from 'telegraf'
import { Callback } from './callbackQuery.interface'

export default interface Context extends ContextTelegraf {
  session: { userId?: number }
  callbackQuery: Callback
  payload?: string
  update: any
}
