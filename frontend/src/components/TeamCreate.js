import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { emailValidator } from '../utils/validators';
import AddAdornment from './AddAdornment';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { URLs } from '../utils/constants'

// PENDING -
// Remove field
// Back Btn

const emptyDataObject = {
  name: "",
  members: [""]
}

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1)
    }
  })
)

function TeamCreate() {
  const classes = useStyles()
  const [data, setData] = useState(emptyDataObject)
  const [error, setError] = useState(emptyDataObject)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value,
    })
  }
  const handleMember = (e) => {
    const newMembers = [...data.members]
    const idx = e.target.name.split('-')[1]
    newMembers[idx] = e.target.value
    setData({
      ...data, members: newMembers
    })
  }
  const addMember = () => {
    setData({
      ...data,
      members: [...data.members, ""]
    })
    setError({
      ...error,
      members: [...error.members, ""]
    })
  }
  const handleSave = (e) => {
    e.preventDefault()
    const nameErr = data.name.length === 0?"Team name cannot be empty!": ""
    const memberErrs = data.members.map(email => emailValidator(email)?"":"Please enter a valid email id")
    if(nameErr.length || memberErrs.filter(item => item.length > 0).length) {
      setError({ name: nameErr, members: memberErrs })
      return;
    }
    setError({
      ...emptyDataObject, 
      members: error.members.map(_ => "")
    })
    const reqData = {
      name: data.name,
      emails: data.members
    }
    axios.post("/auth/team/", reqData)
    .then(res => {
      navigate(URLs.home.route)
    })
    .catch(err => {
      setError({
        ...error,
        members: data.members.map(email => err.response.data.users.includes(email)?"User not found!": "")
      })
    })
  }
  
  return (
    <Grid container justifyContent='center' component='form' onSubmit={handleSave}>
      <Grid item xs={12} sm={8} className={classes.margin}>
        <TextField onChange={handleChange} value={data.name} error={error.name} helperText={error.name} name="name" placeholder="Enter the team name" label="Team Name" variant="outlined" fullWidth />
      </Grid>
      {/* <Grid item xs={12}>
        <Typography variant="h5" component="div" align="center"> Add team members </Typography>
      </Grid> */}
      {
        data.members.map((member, idx) => (
          <Grid item xs={12} sm={8} key={idx} className={classes.margin}>
            <TextField 
              onChange={handleMember} 
              value={member}
              error={error.members[idx]}
              helperText={error.members[idx]}
              name={`member-${idx}`}
              placeholder="Enter member's email"
              label="Member Email"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: <AddAdornment onClick={addMember} />
              }}
            />
          </Grid>
        ))
      }
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={4} lg={3}>
          <Button fullWidth type="submit" variant="contained" color="primary">Save</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeamCreate