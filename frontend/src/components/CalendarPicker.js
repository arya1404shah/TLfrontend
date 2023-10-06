import { KeyboardDatePicker } from '@material-ui/pickers'
import React from 'react'

function CalendarPicker({ date, handleDateChange }) {
  return (
    <KeyboardDatePicker
      disableToolbar
      disablePast
      variant="static"
      format="dd/mm/yyyy"
      margin="normal"
      value={date}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  )
}

export default CalendarPicker