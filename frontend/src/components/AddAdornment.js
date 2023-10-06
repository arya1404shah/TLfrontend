import { IconButton, InputAdornment } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React from 'react'

const VisibleAdornment = ({ onClick }) => (
  <InputAdornment position="end" onClick={onClick}>
    <IconButton>
      <AddCircleOutlineIcon />
    </IconButton>
  </InputAdornment>
)

export default VisibleAdornment