import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import ContactsOutlined from '@material-ui/icons/ContactsOutlined';
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import StarBorder from '@material-ui/icons/StarBorder';
import PersonOutline from '@material-ui/icons/PersonOutline';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import NotificationIconOutline from '@material-ui/icons/NotificationImportantOutlined';

import ListItemLink from '../components/ListItemLink';

const useStyles = makeStyles({
	list: {
	  width: 250,
	},
	fullList: {
	  width: 'auto',
	},
});

const devide = 4;

const sideBarConfig = [
	{
		label: 'Contact List',
		route: '/contacts',
		Icon: ContactsOutlined
	},
	{
		label: 'Moments',
		route: '/moments',
		Icon: ImageOutlined
	},
	{
		label: 'Saved Messages',
		route: '/savedmessages',
		Icon: StarBorder
	},
	{
		label: 'Requests',
		route: '/requests',
		Icon: NotificationIconOutline
	},
	{
		label: 'Profile',
		route: '/me',
		Icon: PersonOutline
	},
	{
		label: 'Settings',
		route: '/settings',
		Icon: SettingsOutlined
	},
]
 
export default function SideBar({open, closeSideBar}) {
	const classes = useStyles();
	const sideList = () => (
		<div
		  className={classes.list}
		  role="presentation"
		  onClick={closeSideBar}
		  onKeyDown={closeSideBar}
		>
		  <List>
			{sideBarConfig.slice(0, devide).map(props => (
				<ListItemLink {...props}/>
			))}
		  </List>
		  <Divider />
		  <List>
		  	{sideBarConfig.slice(devide, ).map(props => (
				<ListItemLink {...props}/>
			))}
		  </List>
		</div>
	);
	 return (
		<SwipeableDrawer
			open={open}
			onClose={closeSideBar}
			onOpen={closeSideBar}
		>
			{sideList()}
		</SwipeableDrawer>
	 );
 }
