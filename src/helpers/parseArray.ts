const parseArray = (str) => {
  const array = str
    .slice(1, -1)
    .replace(/'/g, '')
    .split(',')
    .map((item) => item.trim())
  return array
}

export default parseArray
