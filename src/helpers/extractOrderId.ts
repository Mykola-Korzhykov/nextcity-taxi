const extractOrderId = (orderString) => {
  const orderIdRegex = /ID заказа:\s*(\d+)/
  const match = orderString.match(orderIdRegex)

  return match ? match[1] : null
}

export default extractOrderId
