import React from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

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
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 1),
		width: theme.spacing(7),
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

export default function SearchBar({email, onChange, onSubmit}) {
	const classes = useStyles();
	return (
		<AppBar color="default" className={classes.appBar}>
			<Toolbar>
				<Link style={{ textDecoration: 'none', color: 'inherit' }} to='/main'>
					<IconButton
						className={classes.backButton}
						color="inherit"
						aria-label="go back"
					>
						<ArrowBackIcon />
					</IconButton>
				</Link>
				<div className={classes.search}>
					<form onSubmit={onSubmit}>
						<InputBase
							placeholder="Search For User"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							value={email}
							onChange={e => onChange(e)}
						/>
					</form>
				</div>
				<div>
					<IconButton aria-label="search" color="inherit" onClick={onSubmit}>
						<SearchIcon />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
}
