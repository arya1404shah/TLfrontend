import { Grid, Hidden } from '@material-ui/core'
import React, { useContext } from 'react'
import KVContext from '../context/KVContext'

function SignupTemplate({children, bottomText}) {
  const { LOGIN_BG } = useContext(KVContext)
  
  return (
    <Grid container item style={{flexGrow: 1}} justifyContent="center" alignItems="center">
      <Hidden xsDown>
        <Grid item xs={6} style={{background: LOGIN_BG.startsWith('http')?`url(${LOGIN_BG})`:LOGIN_BG, height: "100%"}} />
      </Hidden>
      <Grid container item xs={12} sm={6} style={{padding: 24, height: "100%"}} justifyContent="center" alignContent="space-between">
        <Grid item xs={12} />
        <Grid item xs={12} md={8} xl={6}>
          {children}
        </Grid>
        <Grid item xs={12}>
          {bottomText? bottomText:""}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SignupTemplate