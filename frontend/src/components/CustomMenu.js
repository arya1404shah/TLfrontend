import React, { useContext, useState } from 'react'
import { Avatar, Button, Divider, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import AuthContext from '../context/AuthContext'
import { logout } from '../utils/utils'
import { URLs } from '../utils/constants'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    menuItem: {
      minWidth: 100,
    },
    avatar: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    }
  }
))
function CustomMenu() {
  const classes = useStyles()
  const { user, setUser } = useContext(AuthContext)
	const [anchor, setAnchor] = useState(null)
	const clickMenu = (e) => {
		setAnchor(e.currentTarget)
	}
	const closeMenu = () => {
		setAnchor(null)
	}
  const clickLogout = () => {
    closeMenu()
    const newUser = logout()
    setUser(newUser)
  }
  return (
    <>
    {
      user.token?
      <>
        <Avatar className={classes.avatar} onClick={clickMenu} />
        <Menu
          keepMounted 
          anchorEl={anchor} 
          open={Boolean(anchor)} 
          onClose={closeMenu} 
        >
          <MenuItem className={classes.menuItem} disabled style={{opacity: 1}}>
            <Typography variant="subtitle1" color="textPrimary">Welcome {user.fname}</Typography>
          </MenuItem>
          <Divider />
          <Link to={URLs.profile.route}>
            <MenuItem className={classes.menuItem} onClick={closeMenu}>My Profile</MenuItem>
          </Link>
          <Link to={URLs.team.route}>
            <MenuItem className={classes.menuItem} onClick={closeMenu}>View Teams</MenuItem>
          </Link>
          <Link to={URLs.project_create.route}>
            <MenuItem className={classes.menuItem} onClick={closeMenu}>Create Project</MenuItem>
          </Link>
          <MenuItem className={classes.menuItem} onClick={clickLogout}>Logout</MenuItem>
        </Menu>
      </>
      :
      <Link to={URLs.login.route}>
        <Button variant='contained' style={{width: 55}}>Login</Button>
      </Link>
    }
    </>
  )
}

export default CustomMenu