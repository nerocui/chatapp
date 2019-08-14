import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuItemLink from '../components/MenuItemLink';

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
	title: {
		flexGrow: 1,
	},
	grow: {
	  	flexGrow: 1,
	},
}));

export default function TopAppBar({requests = 0, openMenu}) {
	const classes = useStyles();
	//switch to light and dark mode

	const [addButtonAnchorEl, setAnchorAddButton] = React.useState(null);

	function handleAddButtonClick(event) {
		setAnchorAddButton(event.currentTarget);
	}

	function handleAddMenuClose() {
		setAnchorAddButton(null);
	}
	return (
		<AppBar position="fixed" color="default" className={classes.appBar}>
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="open drawer" onClick={openMenu}>
					<Badge color="secondary" invisible={requests===0} variant="dot">
						<MenuIcon />
					</Badge>
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					YouChat
				</Typography>
				<div className={classes.grow} />
				<IconButton color="inherit" onClick={handleAddButtonClick}>
					<AddIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={addButtonAnchorEl}
					keepMounted
					open={Boolean(addButtonAnchorEl)}
					onClose={handleAddMenuClose}
				>
					<MenuItem onClick={handleAddMenuClose}>New Chat</MenuItem>
					<MenuItemLink onClick={handleAddMenuClose} to='/search' label='Add New Contact' />
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
