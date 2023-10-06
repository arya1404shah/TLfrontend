import React from 'react'
import { Grid, Typography } from '@material-ui/core'

function IconText({ icon, text, typoProps, className, center }) {
  return (
    <Grid container alignItems="center" justifyContent={center?'center':null} spacing={1} className={className}>
      <Grid item>
      {icon}
      </Grid>
      <Grid item>
      <Typography component="span" {...typoProps} style={{overflow: "word-break"}}>
        {text}
      </Typography>
      </Grid>
    </Grid>
  )
}

export default IconText