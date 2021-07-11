export const parseDate = (str: string) => new Date(str.replace(' ', 'T'))

export const dateToString = (date: string) => {
  const parsedDate = parseDate(date).toString().slice(4, 15).split(' ')
  parsedDate[1] += ','
  return parsedDate.join(' ')
}
