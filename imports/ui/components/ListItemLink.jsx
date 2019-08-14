import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default function ListItemLink({label, route, Icon}) {
	return (
		<Link to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
			<ListItem button key={label}>
				<ListItemIcon><Icon /></ListItemIcon>
				<ListItemText primary={label} />
			</ListItem>
		</Link>
	);
}
