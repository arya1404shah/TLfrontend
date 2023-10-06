import { IconButton, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React from 'react'

const VisibleAdornment = ({visible, onClick}) => (
  <InputAdornment position="end" onClick={onClick}>
    <IconButton>
      {visible? <Visibility />:<VisibilityOff />}
    </IconButton>
  </InputAdornment>
)

export default VisibleAdornment