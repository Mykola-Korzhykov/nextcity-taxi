const extractNumber = (str) => {
  let cleanedStr = str.replace(/\D/g, '')
  let number = parseInt(cleanedStr, 10)
  return number
}

export default extractNumber
