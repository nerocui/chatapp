import React from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	appBar: {
		width: '96%',
		marginTop: '.5rem',
		marginLeft: '2%',
		marginRight: '2%',
		borderRadius: '.5rem',
		display: 'block',
		top: 0,
		bottom: 'auto',
	},
	backButton: {
	  	marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
  },
}));

export default function BackAppBar({route, label}) {
	const classes = useStyles();
	return (
		<AppBar color="default" className={classes.appBar}>
			<Toolbar>
				<Link style={{ textDecoration: 'none', color: 'inherit' }} to={route}>
					<IconButton
						className={classes.backButton}
						color="inherit"
						aria-label="go back"
					>
						<ArrowBackIcon />
					</IconButton>
				</Link>
				<Typography variant="h6" className={classes.title}>
					{label}
				</Typography>
				<div className={classes.grow} />
			</Toolbar>
		</AppBar>
	);
}

