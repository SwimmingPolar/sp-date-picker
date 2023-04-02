# sp-date-picker

Date picker components that allows you to select a day or date range.
It comes with two components and utility functions to help you with date manipulation.

[Demo](https://6411a222f5925f939069a362-cqueebvdjx.chromatic.com/?path=/story/demo--demo)

## Installation

```bash
TBA
```

## Usage

### DatePicker

```javascript
import { useCallback, useMemo } from 'react'
import { DatePicker, getYearMonthDate, useDatePicker } from 'sp-date-picker'

const App = () => {
  // 1. Use the hook provided
  const datePicker = useDatePicker()

  // 2. Extract what you need from the hook
  const { handleOpen, startDate, endDate } = datePicker

  // 3. Create handlers that open/close the date picker
  const handleDatePickerOpen = useCallback(() => {
    handleOpen(true)
  }, [handleOpen])
  const handleDatePickerClose = useCallback(() => {
    handleOpen(false)
  }, [handleOpen])

  // ...

  const startDateString = useMemo(() => {
    return startDate ? getYearMonthDate(startDate) : ''
  }, [startDate])
  const endDateString = useMemo(() => {
    return endDate ? getYearMonthDate(endDate) : ''
  }, [endDate])

  return (
    <>
      {/* 4. Link handlers that open/close the date picker
          5. Make inputs controlled components */}
      <input
        type="text"
        placeholder="Start date"
        value={startDateString}
        onClick={handleDatePickerOpen}
      />
      <input
        type="text"
        placeholder="End date"
        value={endDateString}
        onClick={handleDatePickerOpen}
      />
      {/* 6. Pass the value returned from the hook to the date picker
          7. Don't forget to pass the onCloseClick handler */}
      <DatePicker {...datePicker} onCloseClick={handleDatePickerClose} />
    </>
  )
}

export default App
```

### DayPicker

```javascript
import { useCallback, useMemo } from 'react'
import { DayPicker, useDayPicker } from 'sp-date-picker'

const App = () => {
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

  const selectedDayString = useMemo(() => {
    return selectedDay > 0 ? `Day ${selectedDay}` : ''
  }, [selectedDay])

  return (
    <>
      {/* 4. Link handlers that open/close the date picker
          5. Make input controlled component */}
      <input
        type="text"
        placeholder="Pick a day!"
        value={selectedDayString}
        onClick={handleDayPickerOpen}
      /> {/* 6. Pass the value returned from the hook to the day picker
          7. Don't forget to pass the onCloseClick handler */}
      <DayPicker {...dayPicker} onCloseClick={handleDayPickerClose} />
    </>
  )
}

export default App
```

## Screenshots

![range picker](assets/range-picker.png)

<br/>

![day picker](assets/day-picker.png)

## Custom Styling

If you are willing to customize the styling of the date picker, you can use the `id` prop to pass in your own class name.

_In the code_

```javascript
<DatePicker
  {...datePicker}
  onCloseClick={handleDatePickerClose}
  isRange
  // Pass in your own id to customize the styling
  // This is needed to make higer specificity
  id="demo"
/>
```

_In the css_

```css
#demo .datepicker__day.selected {
  background-color: purple;
  border-color: purple;
}

#demo .datepicker__day-box:has(.selected) {
  background-color: purple;
}

#demo .datepicker__day-box:has(.between) {
  background-color: purple;
}
```

Target the `id` you passed in to the date picker and select the element you want to customize. **You can see what selector you are looking for by inspecting the element in the browser.**

Here are few examples of css selectors you can use to customize the styling.

| Selector                                                                  |
| ------------------------------------------------------------------------- |
| .datepicker\_\_day.selected                                               |
| .datepicker\_\_day-box:has(.selected)                                     |
| .datepicker\_\_day-box:has(.between)                                      |
| .datepicker\_\_day:hover                                                  |
| .datepicker\_\_month.selected                                             |
| .datepicker\_\_footer\_\_clear-date-button.datepicker\_\_footer\_\_button |
| .datepicker\_\_footer\_\_confirm-button.datepicker\_\_footer\_\_button    |

Try including the below css in your project to see how it looks like.

**Custom Style**

![custom styling](assets/styling.png)

**CSS**

```css
#demo .datepicker__footer__clear-date-button.datepicker__footer__button span {
  color: gray;
}

#demo .datepicker__footer__confirm-button.datepicker__footer__button {
  background-color: #ffac2c;
}

#demo .datepicker__day.selected {
  background-color: #ffac2c;
  border-color: #ffac2c;
}

#demo .datepicker__day-box:has(.selected) {
  background-color: #fff1e6;
}

#demo .datepicker__day-box:has(.between) {
  background-color: #fff1e6;
}
```

## Options

There are the props you might be interested in.

### DatePicker

| Option                  | Required | Description                                          | Default           | Type                                  |
| ----------------------- | -------- | ---------------------------------------------------- | ----------------- | ------------------------------------- |
| title                   |          | Title of the date picker                             | Pick dates range! | string                                |
| date                    | \*       | Currently selected date (used on day picker)         |                   | Date                                  |
| startDate               | \*       | Currently selected start date (used on range picker) |                   | Date                                  |
| endDate                 | \*       | Currently selected end date (used on range picker)   |                   | Date                                  |
| open                    | \*       | Whether the date picker is open or not               | false             | boolean                               |
| onConfirmClick          | \*       | Clled when confirm button is clicked                 |                   | ({ date, startDate, endDate}) => void |
| onCloseClick            | \*       | Called when close button is clicked                  |                   | () => void                            |
| onBackdropClick         |          | Called when backdrop is clicked                      |                   | () => void                            |
| isRange                 |          | Whether the date picker is a range picker or not     | true              | boolean                               |
| disablePast             |          | Whether to disable past dates when start date is set | false             | boolean                               |
| style                   |          | CSS styles to be applied to the date picker          |                   | CSSProperties                         |
| customSelectMonthMotion |          | Motion to be applied to the month selection          |                   | AnimationProps (framer-motion)        |
| customSelectDayMotion   |          | Motion to be applied to the day selection            |                   | AnimationProps (framer-motion)        |

### DayPicker

| Option          | Required | Description                                  | Default     | Type                           |
| --------------- | -------- | -------------------------------------------- | ----------- | ------------------------------ |
| title           |          | Title of the date picker                     | Pick a day! | string                         |
| selectedDay     | \*       | Currently selected day                       | -1          | number                         |
| open            | \*       | Whether the date picker is open or not       | false       | boolean                        |
| onDayClick      | \*       | Called when a day is clicked                 |             | (day: number) => void          |
| onCloseClick    | \*       | Called when close button is clicked          |             | () => void                     |
| onBackdropClick |          | Called when backdrop is clicked              |             | () => void                     |
| style           |          | CSS styles to be applied to the date picker  |             | CSSProperties                  |
| customMotion    |          | Motion to be applied to the picker container |             | AnimationProps (framer-motion) |

Most of props are given by the hook provided. Use javascript deconstruction to extract what you need. See the example below.

```javascript
// DatePicker - a range picker
const datePicker = useDatePicker()
const { startDate, endDate } = datePicker

// DatePicker - a day picker
const datePicker = useDatePicker()
const { date } = datePicker

// DayPicker
const dayPicker = useDayPicker()
const { selectedDay } = dayPicker
```

Extract handlers to create open/close handlers.

```javascript
const datePicker = useDatePicker()
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

- [x] Fix failing tests
- [ ] ~~Add more tests if needed~~
