import { DateTime } from 'luxon'

const formatDate = (isoString) => {
  let date = DateTime.fromISO(isoString, { zone: 'utc' })
  return date.toFormat('dd-MM-yyyy HH:mm:ss')
}

export default formatDate
