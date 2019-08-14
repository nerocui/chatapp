import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

export default function MenuItemLink({to, onClick, label}) {
	return <MenuItem onClick={onClick}><Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>{label}</Link></MenuItem>;
}
