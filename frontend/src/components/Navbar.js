import { AppBar, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import KVContext from '../context/KVContext'
import CustomDrawer from './CustomDrawer'
import CustomMenu from './CustomMenu'

import { URLs } from '../utils/constants'
import { Link } from 'react-router-dom';

import { debounce } from '../utils/utils';

import LogoImage from '../assets/images/logo.png'
import { HashLink } from 'react-router-hash-link'

const useStyles = makeStyles(theme => ({
		navitem: {
			borderBottom: `4px solid ${theme.palette.secondary.main}`
		},
		psmall: {
			padding: theme.spacing(1)
		}
	})
)

function Navbar({active}) {
	// const TITLE = "Tinkerers'\xa0Lab"
	const TITLE = "TL-ICT\xa0Mumbai"
	const classes = useStyles()
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
	const [colored, setColored] = useState(false);
	
	const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;
    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30) || currentScrollPos < 10);
    setColored(currentScrollPos !== 0)
		setPrevScrollPos(currentScrollPos);
  }, 100);

	useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

	const theme = useTheme()
	const navbarStyles = {
    position: 'fixed',
  	maxHeight: '64px',
    width: '100%',
		maxWidth: '100vw',
		left: '0',
    textAlign: 'center',
    transition: 'top 0.075s',
		backgroundColor: theme.palette.background.default,
  }
	const options = Object.values(URLs)

	const isXs     = useMediaQuery('@media (max-width:374.95px)')
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	const isTablet = useMediaQuery(theme.breakpoints.down('md'))
	return (
		<>
		{/* 64px = Default toolbar height */}
		<AppBar style={{ ...navbarStyles, top: visible ? '0' : '-64px' }}>
			<Toolbar style={{justifyContent: "space-between"}}>
				<div style={{display: 'flex', alignItems: "center"}}>
					{
						isTablet?
						<div><CustomDrawer /></div>
						:
						<></>
					}
					<Link to={URLs.home.route}>
						<ListItem className={classes.psmall}>
							<ListItemIcon style={{minWidth: 0, marginRight: isMobile?4:8}}>
								<img src={LogoImage} style={{width:isMobile?36:48, height: isMobile?36:48}} alt="logo"/>
							</ListItemIcon>
							<ListItemText primary={TITLE} primaryTypographyProps={{variant:isXs?"h5":"h4"}}/>
						</ListItem>
					</Link>
				</div>
				<List style={{display: 'flex', justifyContent: "center", alignItems:"center"}}>
					{
						isTablet?
						<></>
						:
						options.filter(option => option.display).map((option, idx) => (
								option.scroll?
								<HashLink to={option.route} key={idx}>
									<ListItem button className={active===option.display?classes.navitem:null}>
										<ListItemText primary={option.display} align="center" />
									</ListItem>
								</HashLink>
								:
								<Link to={option.route} key={idx}>
									<ListItem button className={active===option.display?classes.navitem:null}>
										<ListItemText primary={option.display} primaryTypographyProps={{align:'center'}}/>
									</ListItem>
								</Link>
							)
						)
					}
					<ListItem style={{padding: isMobile?'0':'initial'}}><CustomMenu /></ListItem>
				</List>
			</Toolbar>
		</AppBar>
		<Toolbar />
		</>
	)
}

export default Navbar