import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import MemberAvatar from "../components/MemberAvatar"
import axios from 'axios'
import { useParams } from 'react-router-dom'

function AllMembers() {
  const [members, setMembers] = useState([])

  const params = useParams()
  const year = parseInt(params.year)
  
  useEffect(() => {
    axios.get(`/misc/members/${year}/`)
    .then(res => {
      setMembers(res.data)
    })
  }, [])
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12}>
        <Typography variant="h2" align="center"> Core | {year===2022?"Founding Committee":`TL Core ${year}-${year+1}`}</Typography>
      </Grid>
      { 
        members.map((item, idx) => (
          <Grid item>
            <MemberAvatar 
              name={item.name} position={item.post} quote={item.quote} image={item.image} size={200} 
              xs={12} sm={12} md={12} lg={12}
              overlap
            />
          </Grid>
        ))
      }
    </Grid>
  )
}

export default AllMembers