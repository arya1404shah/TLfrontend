import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const useStyles = makeStyles(theme => ({
		padding: {
			padding: theme.spacing(3)
		},
		root: {
			backgroundColor: theme.palette.background.default,
			color: theme.palette.text.primary
		}
	})
)

function Template({ children, noFlex, noFooter, noPadding, active }) {
	const classes = useStyles()
	return (
		<Grid container className={classes.root} style={{minHeight: "100vh", flexDirection: "column"}}>
			<Grid item xs={12}>
				<Navbar active={active} />
			</Grid>
			<Grid item container xs={12} className={noPadding?null:classes.padding} justifyContent="center" alignItems={noFooter?'stretch':"flex-start"} style={{flexGrow: noFlex?0:1}}>
				{ children }
			</Grid>
			{
				noFooter?null:(
				<Grid item container xs={12}>
					<Footer />
				</Grid>
				)
			}
		</Grid>
	)
}

export default Template