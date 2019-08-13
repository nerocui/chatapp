import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
	text: {
	  padding: theme.spacing(2, 2, 0),
	},
	paper: {
	  paddingBottom: 50,
	},
	list: {
	  marginBottom: theme.spacing(2),
	},
	subheader: {
	  backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		display: 'block',
		top: 0,
		bottom: 'auto',
	},
	grow: {
	  flexGrow: 1,
	},
	// fabButton: {
	//   position: 'absolute',
	//   zIndex: 1,
	//   bottom: -30,
	//   left: 0,
	//   right: 0,
	//   margin: '0 auto',
	// },
}));

export default function TopAppBar({openMenu}) {
	const classes = useStyles();
	//switch to light and dark mode

	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}
	return (
		<AppBar position="fixed" color="primary" className={classes.appBar}>
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="open drawer" onClick={openMenu}>
					<MenuIcon />
				</IconButton>
				{/* <Fab color="secondary" aria-label="add" className={classes.fabButton}>
					<AddIcon />
				</Fab> */}
				<div className={classes.grow} />
				<IconButton color="inherit">
					<SearchIcon />
				</IconButton>
				<IconButton edge="end" color="inherit" onClick={handleClick}>
					<MoreIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
