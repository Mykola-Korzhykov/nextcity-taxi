const infoLabels = {
  driverName: '👨🏻 Имя водителя',
  driverPhone: '📞 Номер водителя',
  carColor: '🚕 Цвет автомобиля',
  carModel: '🚕 Модель автомобиля',
  carLicensePlate: '🚕 Гос.знак',
}

const updateDriverInfo = (orderString, infoType, newValue) => {
  if (!infoLabels[infoType]) {
    throw new Error('Invalid driver info type')
  }

  const infoPatterns = {}
  for (const [key, label] of Object.entries(infoLabels)) {
    infoPatterns[key] = new RegExp(`${label}:\\s*---`)
  }

  const pattern = infoPatterns[infoType]
  const newInfo = `${infoLabels[infoType]}: ${newValue}`

  return orderString.replace(pattern, newInfo)
}

export { updateDriverInfo, infoLabels }
