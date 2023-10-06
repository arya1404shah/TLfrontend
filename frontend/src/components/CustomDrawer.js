import React, { useContext, useState } from 'react'

import { IconButton, Drawer, List, ListItem, ListItemText, makeStyles, Divider, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { URLs } from '../utils/constants'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import KVContext from '../context/KVContext';

const useStyles = makeStyles(theme => ({
	drawerHeader: {
		...theme.mixins.toolbar,
	},
	widthAdjust: {
		width:300,
		[theme.breakpoints.down('xs')]: {
			width: '100vw',
		},
	},
	menuButton: {
		marginRight: theme.spacing(1),
		[theme.breakpoints.down('sm')]: {
			marginRight: 0,
			padding: 0,
			paddingLeft: theme.spacing(1)
		}
	},
})
)
function CustomDrawer() {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const toggle = () => setOpen(!open)
	const options = Object.values(URLs)
	const { TITLE } = useContext(KVContext)
	return (
		<>
			<IconButton 
				className={classes.menuButton} 
				size="medium" 
				onClick={toggle}
			>
				<MenuIcon className={classes.m0} />
			</IconButton>
			<Drawer open={open} onClose={toggle}>
				<Grid className={classes.drawerHeader} container justifyContent='center' alignItems="center">
					<Grid item>
						<Typography variant="h6">{TITLE} | ICT Mumbai</Typography>
					</Grid>
				</Grid>
				<Divider />
				<List onClick={toggle} className={classes.widthAdjust}>
					{
						options.filter(option => option.display).map((option, idx) => (
							option.scroll?
							<HashLink to={option.route} key={idx}>
								<ListItem button>
									<ListItemText primary={option.display} align="center" />
								</ListItem>
							</HashLink>
							:
							<Link to={option.route} key={idx}>
								<ListItem button>
									<ListItemText primary={option.display} align="center" />
								</ListItem>
							</Link>
							)
						)
					}
				</List>
			</Drawer>
		</>
	)
}

export default CustomDrawer