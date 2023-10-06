import { TextField } from '@material-ui/core'
import React from 'react'
import TimeAdornment from './TimeAdornment'

function TimeInput(props) {
  return (
    <TextField
      {...props}
      InputProps={{
        endAdornment: <TimeAdornment />,
        style: {paddingRight: 7}
      }}
    />
  )
}

export default TimeInput