import { Status } from '../types/order.types'

const statusList = {
  wait: '⌛ Ожидается',
  cancelled: '❌ Отменён',
  confirmed: '✅ Подтверждён',
  finished: '☑️ Завершён',
}

const formatStatus = (status: Status) => {
  return statusList[status]
}

const updateStatusMessage = (orderString, newStatus) => {
  const statuses = Object.values(statusList).join('|')
  const statusRegex = new RegExp(`^(.*?)(${statuses})(.*)$`, 's')

  const validStatuses = Object.values(statusList)
  if (!validStatuses.includes(newStatus)) {
    throw new Error('Invalid status')
  }

  return orderString.replace(
    statusRegex,
    (match, beforeStatus, currentStatus, afterStatus) => {
      return `${beforeStatus}${newStatus}${afterStatus}`
    },
  )
}

export { formatStatus, updateStatusMessage, statusList }
