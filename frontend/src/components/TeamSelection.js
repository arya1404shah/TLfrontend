import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

function TeamSelection({ selectedTeam, teamsData, onChange, label }) {
  // console.log(selectedTeam)
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="team">{label}</InputLabel>
      <Select
        value={selectedTeam}
        onChange={onChange}
        label={label}
        labelId="team"
        name="team"
        fullWidth
      >
        {
          teamsData.map(item => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            )
          )
        }
      </Select>
    </FormControl>
  )
}

export default TeamSelection