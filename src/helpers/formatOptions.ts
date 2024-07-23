const formatOptions = (options) => {
  let list: any = options
    .filter((option) => option.value)
    .map((option) => option.name)
    .join(', ')

  if (list.length === 0) list = 'Нет доп.опций'

  return list
}

export default formatOptions
