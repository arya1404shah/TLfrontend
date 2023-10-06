import { Button, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { emailValidator } from '../utils/validators'
const emptyDataObject = {
  fname: "",
  lname: "",
  email: "",
  message: "",
  generic: "",
}

function ContactForm() {
  const [data, setData] = useState(emptyDataObject)
  const [error, setError] = useState(emptyDataObject)

  const handleChange = (e) => {
    if(error.generic.length !== 0) {
      setError({...error, generic: ""})
    }
    if(error[e.target.name].length !== 0) {
      setError({...error, [e.target.name]: ""})
    }
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!data.fname.length || !data.lname.length || !data.email.length || !data.message.length) {
      setError({...emptyDataObject, generic: "Please fill out all fields!" })
      return;
    }
    if(!emailValidator(data.email)){
      setError({...emptyDataObject, email: "Please enter a valid email address!"})
      return;
    }
    axios.post('/misc/contact/', data)
    .then(res => setData(emptyDataObject))
    .catch(err => console.log(err.response))
  }

  return (
    <Grid container item xs={12} justifyContent="center" spacing={1} component='form' onSubmit={handleSubmit}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          margin="normal" 
          variant="outlined"
          label="First Name"
          placeholder="First Name"
          value={data.fname}
          name="fname" 
          onChange={handleChange}
          error={error.fname.length !==0 || error.generic.length !== 0}
          helperText={error.fname || error.generic}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          margin="normal" 
          variant="outlined"
          label="Last Name"
          placeholder="Last Name"
          value={data.lname}
          name="lname" 
          onChange={handleChange}
          error={error.lname.length !== 0 || error.generic.length !== 0}
          helperText={error.lname || error.generic}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          fullWidth
          margin="normal" 
          variant="outlined" 
          label="Email" 
          placeholder="Email Address" 
          value={data.email} 
          name="email" 
          onChange={handleChange}
          error={error.email.length !== 0 || error.generic.length !== 0}
          helperText={error.email || error.generic}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          minRows={4}
          multiline
          name="message"
          label="Message"
          value={data.message}
          onChange={handleChange}
          variant="outlined"
          error={error.message.length !== 0 || error.generic.length !== 0}
          fullWidth 
          helperText={error.message || error.generic}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Button fullWidth type="submit" variant="contained" color='primary'>Send Message</Button>
      </Grid>
    </Grid>
  )
}

export default ContactForm