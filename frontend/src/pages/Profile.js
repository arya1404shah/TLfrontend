import { Button, Card, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { emailValidator } from '../utils/validators'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      maxHeight: '100%',
    }
  })
)


const emptyDataObject = {
  email: "",
  fname: "",
  lname: "",
}

function Profile() {
  const classes = useStyles()
  const { user, setUser } = useContext(AuthContext)
  
  const [error, setError] = useState(emptyDataObject)
  const [newUser, setNewUser] = useState(user)
  const handleChange = (e) => {
    setNewUser({
      ...newUser, [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setError(emptyDataObject)
    if(!newUser.fname.length || !newUser.lname.length || !newUser.email.length) {
      setError({...emptyDataObject, generic: "Please fill out all fields!" })
      return;
    }
    if(!emailValidator(newUser.email)){
      setError({...emptyDataObject, email: "Please enter a valid email address!"})
      return;
    }
    axios.patch('/auth/edit-user/', newUser)
    .then(res => {
      localStorage.setItem('email', res.data.email)
      localStorage.setItem('fname', res.data.fname)
      localStorage.setItem('lname', res.data.lname)

      res.data.token = localStorage.getItem('token')
      setUser(res.data)
    })
  }

  return (
    <Grid container item xs={12} sm={8} lg={6}>
      <Grid container item xs={12} alignContent="flex-start" component={Card} className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            {user.fname+" "+user.lname}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {user.email}
          </Typography>
          <Divider />
        </Grid>
        <Grid container component='form' item xs={12} spacing={2} justifyContent="center" onSubmit={handleSubmit}>
          <Grid item xs={12} sm={6}>
            <TextField onChange={handleChange} value={newUser.fname} error={error.fname} name="fname" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField onChange={handleChange} value={newUser.lname} error={error.lname} name="lname" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={handleChange} value={newUser.email} error={error.email} name="email" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Profile