const formatAddresses = (addresses) => {
  return addresses
    .map((address, index) => {
      const isLast = index === addresses.length - 1
      const suffix = isLast ? '🚩' : '->'

      if (!address.route) address.route = 'Неизвестно'

      if (address.entrance) {
        return `➡️ ${address.route} ${address.entrance} ${suffix}`
      } else {
        return `➡️ ${address.route} ${suffix}`
      }
    })
    .join('\n')
}

export default formatAddresses
