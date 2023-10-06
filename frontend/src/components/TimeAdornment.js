import { IconButton, InputAdornment } from '@material-ui/core'
import TodayIcon from '@material-ui/icons/Today';
import React from 'react'

const TimeAdornment = () => (
  <InputAdornment position="end">
    <IconButton>
      <TodayIcon />
    </IconButton>
  </InputAdornment>
)

export default TimeAdornment