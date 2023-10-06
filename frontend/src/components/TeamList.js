import React from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.primary,
  }
})
)
function TeamList({data}) {
  const classes = useStyles()
  return (
    <List>
    {data.map(team => (
      <ListItem id={team.id}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            {team.name[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={
          <Typography variant="h6">
            {team.name}
          </Typography>
        }/>
      </ListItem>
    ))}
    </List>
  )
}

export default TeamList