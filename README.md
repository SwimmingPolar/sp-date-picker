# sp-date-picker

Date picker components that allows you to select a day or date range.
It comes with two components and utility functions to help you with date manipulation.

- RangePicker
- DayPicker
- date utils

[Storybook](https://6411a222f5925f939069a362-xffpssoiic.chromatic.com/)

## Screenshots

![range picker](assets/range-picker.png)

<br/>

![day picker](assets/day-picker.png)

## Installation

```bash
To Be Added
```

## Usage

### DatePicker

```javascript
// 1. Use the hook provided
const datePicker = useDatePicker()

// 2. Extract what you need from the hook
const { handleOpen, startDate, endDate, ...datePicker } = datePicker

// 3. Create handlers that open/close the date picker
const handleDatePickerOpen = useCallback(() => {
  handleOpen(true)
}, [handleOpen])
const handleDatePickerClose = useCallback(() => {
  handleOpen(false)
}, [handleOpen])

// ...

return (
  // 4. Pass the value returned from the hook to the date picker
  // 5. Don't forget to pass the onCloseClick handler
  <DatePicker {...datePicker} onCloseClick={handleDatePickerClose} />
)
```

### DayPicker

```javascript
// 1. Use the hook provided
const dayPicker = useDayPicker()

// 2. Extract what you need from the hook
const { selectedDay, handleOpen } = dayPicker

// 3. Create handlers that open/close the date picker
const handleDayPickerOpen = useCallback(() => {
  handleOpen(true)
}, [handleOpen])
const handleDayPickerClose = useCallback(() => {
  handleOpen(false)
}, [handleOpen])

// ...

// 4. Pass the value returned from the hook to the date picker
// 5. Don't forget to pass the onCloseClick handler
return <DayPicker {...dayPicker} onCloseClick={handleDayPickerClose} />
```

## Options

There are the props you might be interested in.

### DatePicker

| Option                  | Required           | Description                                          | Default           | Type                                  |
| ----------------------- | ------------------ | ---------------------------------------------------- | ----------------- | ------------------------------------- |
| title                   |                    | Title of the date picker                             | Pick dates range! | string                                |
| date                    | <center>o</center> | Currently selected date (used on day picker)         |                   | Date                                  |
| startDate               | <center>o</center> | Currently selected start date (used on range picker) |                   | Date                                  |
| endDate                 | <center>o</center> | Currently selected end date (used on range picker)   |                   | Date                                  |
| open                    | <center>o</center> | Whether the date picker is open or not               | false             | boolean                               |
| onConfirmClick          | <center>o</center> | Clled when confirm button is clicked                 |                   | ({ date, startDate, endDate}) => void |
| onCloseClick            | <center>o</center> | Called when close button is clicked                  |                   | () => void                            |
| onBackdropClick         |                    | Called when backdrop is clicked                      |                   | () => void                            |
| isRange                 |                    | Whether the date picker is a range picker or not     | true              | boolean                               |
| disablePast             |                    | Whether to disable past dates when start date is set | false             | boolean                               |
| style                   |                    | CSS styles to be applied to the date picker          |                   | CSSProperties                         |
| customSelectMonthMotion |                    | Motion to be applied to the month selection          |                   | AnimationProps (framer-motion)        |
| customSelectDayMotion   |                    | Motion to be applied to the day selection            |                   | AnimationProps (framer-motion)        |

### DayPicker

| Option          | Required           | Description                                  | Default             | Type                           |
| --------------- | ------------------ | -------------------------------------------- | ------------------- | ------------------------------ |
| title           |                    | Title of the date picker                     | Pick a day!         | string                         |
| selectedDay     | <center>o</center> | Currently selected day                       | <center>-1</center> | number                         |
| open            | <center>o</center> | Whether the date picker is open or not       | false               | boolean                        |
| onDayClick      | <center>o</center> | Called when a day is clicked                 |                     | (day: number) => void          |
| onCloseClick    | <center>o</center> | Called when close button is clicked          |                     | () => void                     |
| onBackdropClick |                    | Called when backdrop is clicked              |                     | () => void                     |
| style           |                    | CSS styles to be applied to the date picker  |                     | CSSProperties                  |
| customMotion    |                    | Motion to be applied to the picker container |                     | AnimationProps (framer-motion) |

Most of props are given by the hook provided. Use javascript deconstruction to extract what you need. See the example below.

```javascript
// DatePicker - range picker
const datePicker = useDatePicker()
const { startDate, endDate } = datePicker

// DatePicker - day picker
const datePicker = useDatePicker()
const { date } = datePicker

// DayPicker
const datePicker = useDayPicker()
const { selectedDay } = datePicker
```

Extract handlers to create open/close handlers.

```javascript
const datePicker = useDayPicker()
const { handleOpen } = datePicker

const handleDatePickerOpen = useCallback(() => {
  handleOpen(true)
}, [handleOpen])

const handleDatePickerClose = useCallback(() => {
  handleOpen(false)
}, [handleOpen])
```

## Date Utilities

| Function           | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `getEmptyDays`     | Returns the number of empty days in a month prior to the very first day |
| `getTotalDays`     | Returns the total number of days in a month                             |
| `getDayNames`      | Returns an array of day names in default locale                         |
| `getFirstSunday`   | Returns the day that is the first Sunday of the month                   |
| `isSunday`         | Check if a date is a Sunday                                             |
| `isSaturday`       | Check if a date is a Saturday                                           |
| `isWeekend`        | Check if a date is a weekend (Saturday or Sunday)                       |
| `getYearMonthDate` | Get a date format of YYYY-MM-DD                                         |
| `getYearMonth`     | Get a date format of YYYY-MM                                            |
| `getYear`          | Get a date format of YYYY                                               |
| `getMonth`         | Get a date format of MM                                                 |
| `getDate`          | Get a date format of DD                                                 |

## Todo

- [ ] Fix failing tests
- [ ] Add more tests if needed
