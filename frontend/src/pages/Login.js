import { Button, Grid, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignupTemplate from '../components/SignupTemplate'
import AuthContext from '../context/AuthContext'
import { URLs } from '../utils/constants'
import VisibleAdornment from '../components/VisibleAdornment'

function Login() {
  const [error, setError] = useState("")
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const [visible, setVisible] = useState(false)
  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if(!data.email.length || !data.password.length){
      setError("Please fill out all fields")
      return;
    }
    axios.post('/auth/login/', data)
    .then(res => {
      localStorage.setItem('email', res.data.email)
      localStorage.setItem('fname', res.data.fname)
      localStorage.setItem('lname', res.data.lname)
      localStorage.setItem('token', res.data.token)
      setUser(res.data)
      navigate(URLs.home.route)
    })
    .catch(err => {
      setError("Invalid username or password!")
    })
  }
  const handleChange = (e) => {
    setError("")
    setData({...data, [e.target.name]: e.target.value})
  }
  return (
    <SignupTemplate
      bottomText={(
        <Typography variant="subtitle1" component="div" align="center">
          Don't have an account? <Link to={URLs.signup.route}><u>Sign Up Now!</u></Link>
        </Typography>
      )}
    >
      <Typography variant="subtitle1">Welcome back</Typography>
      <Typography variant="h3">Login to your account</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth
          margin="normal" 
          variant="outlined" 
          label="Email" 
          placeholder="Enter your email" 
          value={data.email} 
          name="email" 
          onChange={handleChange}
          error={error.length!==0}
        />
        <TextField 
          fullWidth 
          margin="normal" 
          variant="outlined" 
          label="Password" 
          placeholder="Enter your password" 
          value={data.password} 
          name="password" 
          onChange={handleChange}
          error={error.length!==0}
          type={visible?"text":"password"}
          InputProps={{
            endAdornment: <VisibleAdornment visible={visible} onClick={() => setVisible(!visible)}/>
          }}
        />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography align="left">{error}</Typography>
          </Grid>
          <Grid item>
            <Typography align="right" gutterBottom>
              <Link to={URLs.forgot_password.route}><u>Forgot Password!</u></Link>
            </Typography>
          </Grid>
        </Grid>
        <Button fullWidth color="primary" type="submit" variant="contained">Login</Button>
      </form>
    </SignupTemplate>
  )
}

export default Login