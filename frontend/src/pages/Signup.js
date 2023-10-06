import { Button, Grid, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignupTemplate from '../components/SignupTemplate'
import { URLs } from '../utils/constants'
import VisibleAdornment from '../components/VisibleAdornment'
import { emailValidator } from '../utils/validators'

const emptyDataObject = {
  email: "",
  fname: "",
  lname: "",
  password: "",
  password2: "",
  generic: "",
}

function Signup() {
  const [error, setError] = useState(emptyDataObject)
  const [data, setData] = useState(emptyDataObject)
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(emptyDataObject)
    if(data.password !== data.password2) {
      setError({...emptyDataObject, password: "Passwords do not match!"})
      return;
    }
    if(!data.fname.length || !data.lname.length || !data.email.length || !data.password.length) {
      setError({...emptyDataObject, generic: "Please fill out all fields!" })
      return;
    }
    if(!emailValidator(data.email)){
      setError({...emptyDataObject, email: "Please enter a valid email address!"})
      return;
    }
    axios.post('/auth/signup/', data)
    .then(res => {
      navigate(URLs.login.route)
    })
    .catch(err => {
      const newErr = {...emptyDataObject}
      Object.keys(err.response.data)
      .forEach(key=> { newErr[key] = err.response.data[key] })
      setError(newErr)
    })
    
  }
  const handleChange = (e) => {
    if(error.generic.length !== 0) {
      setError({...error, generic: ""})
    }
    if(error[e.target.name].length !== 0) {
      setError({...error, [e.target.name]: ""})
    }
    setData({...data, [e.target.name]: e.target.value})
  }
  return (
    <SignupTemplate>
      <Typography variant="subtitle1">Welcome back</Typography>
      <Typography variant="h3">Sign Up for a new account</Typography>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              margin="normal" 
              variant="outlined"
              label="First Name"
              placeholder="Enter your first name"
              value={data.fname}
              name="fname" 
              onChange={handleChange}
              error={error.fname.length!==0 || error.generic.length !== 0}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              margin="normal" 
              variant="outlined"
              label="Last Name"
              placeholder="Enter your last name"
              value={data.lname}
              name="lname" 
              onChange={handleChange}
              error={error.lname.length!==0 || error.generic.length !== 0}
            />
          </Grid>
        </Grid>
        {/* Email */}
        <TextField 
          fullWidth
          margin="normal" 
          variant="outlined" 
          label="Email" 
          placeholder="Enter your email" 
          value={data.email} 
          name="email" 
          onChange={handleChange}
          error={error.email.length!==0 || error.generic.length !== 0}
        />

        {/* Passwords */}
        <TextField 
          fullWidth 
          margin="normal" 
          variant="outlined" 
          label="Password" 
          placeholder="Enter your password" 
          value={data.password} 
          name="password" 
          onChange={handleChange}
          error={error.password.length!==0 || error.generic.length !== 0}
          type={visible1?"text":"password"}
          InputProps={{
            endAdornment: <VisibleAdornment visible={visible1} onClick={() => setVisible1(!visible1)}/>
          }}
        />
        <TextField 
          fullWidth 
          margin="normal" 
          variant="outlined" 
          label="Confirm Password" 
          placeholder="Re-confirm your password" 
          value={data.password2} 
          name="password2" 
          onChange={handleChange}
          error={error.password.length!==0 || error.generic.length !== 0}
          type={visible2?"text":"password"}
          InputProps={{
            endAdornment: <VisibleAdornment visible={visible2} onClick={() => setVisible2(!visible2)}/>
          }}
        />
        <Grid container justifyContent="space-between">
          {
            Object.values(error).map((errorText, id) => (errorText.length?
              <Typography key={id} align="left" gutterBottom>{errorText}</Typography>
              :null
            ))
          }
        </Grid>
        <Button fullWidth color="primary" type="submit" variant="contained">Sign up</Button>
      </form>
    </SignupTemplate>
  )
}

export default Signup