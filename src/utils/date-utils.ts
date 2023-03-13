// Get empty days before the first day of the month
// To get empty days before the first day of the month,
// 1. Set the date to the first date of the month
// 2. Get the day of the week
// 3. The number returned is the number of empty days
//    before the first day of the month
export const getEmptyDays = (date: Date) => {
  return new Date(new Date(date).setDate(1)).getDay()
}

// Get days
// To get total days of the month,
// 1. Set the month to the next month
// 2. Set the date to the first date of the next month
// 3. Subtract 1 day
// 4. Get the date
export const getTotalDays = (date: Date) => {
  const nextMonth = new Date(
    new Date(new Date(date).setMonth(date.getMonth() + 1)).setDate(1)
  )

  const days = new Date(nextMonth.setDate(nextMonth.getDate() - 1)).getDate()
  return Array.from({ length: days }, (_, i) => i + 1)
}

// Get day names
// To get day names,
// 1. Create an array of 7 elements
// 2. Set the date to the first day of the week
//    In this case, set the date to the beginning of the unix epoch (1970-01-01)
//    I found 1970-01-02 (+1) to be the first day of the week (Sunday)
// 3. Use this date to get the day name by adding 1 day at a time
export const getDayNames = () =>
  Array.from({ length: 7 }, (_, i) => i).map(day =>
    new Date(
      new Date().setDate(new Date(0).getDay() + day + 1)
    ).toLocaleDateString('default', { weekday: 'short' })
  )

// Get first Sunday for the given date
// To get the first Sunday for the given date,
// 1. Set the date to the first day of the month
// 2. Get the day of the week
// 3. The number returned is the index among the day names
//    e.g. 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
// 4. 7 subtracted by the number returned is the number of days
//    before the Sunday that may or may not be the first Sunday
// 5. Add 1 to the number returned and
//    modulo 7 to get the very first Sunday
export const getFirstSunday = (date: Date) =>
  (1 + (7 - new Date(new Date(date).setDate(1)).getDay())) % 7

export const isSunday = (date: Date) =>
  date.getDate() % 7 === getFirstSunday(date)

export const isSaturday = (date: Date) =>
  (date.getDate() + 1) % 7 === getFirstSunday(date)

export const Weekend = (date: Date) => isSunday(date) || isSaturday(date)

// Get year, month and date
// e.g. 2020-01-01
export const getYearMonthDate = (date: Date) =>
  new Date(date).toLocaleDateString('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })

// Get year and month
// e.g. 2020-01
export const getYearMonth = (date: Date) =>
  new Date(date).toLocaleDateString('default', {
    year: 'numeric',
    month: 'numeric'
  })

// Get year
// e.g. 2020
export const getYear = (date: Date) =>
  new Date(date).toLocaleDateString('default', {
    year: 'numeric'
  })

// Get month
// e.g. 01
export const getMonth = (date: Date) =>
  new Date(date).toLocaleDateString('default', {
    month: 'numeric'
  })

// Get date
// e.g. 01
export const getDate = (date: Date) =>
  new Date(date).toLocaleDateString('default', {
    day: 'numeric'
  })
