import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	card: {
		width: '100%',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
	  	fontSize: 14,
	},
	pos: {
	  	marginBottom: 12,
	},
});

function RequestCard({email, handleDecline, handleAccept}) {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Friend request from
				</Typography>
				<Typography variant="h5" component="h2">
					{email}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={() => handleDecline()}>Decline</Button>
				<Button size="small" onClick={() => handleAccept()}>Accept</Button>
			</CardActions>
		</Card>
	);
}

const RequestItem = ({loading, user, handleDecline, handleAccept}) => {
	return (
		<div className='component--request-card__container'>
			{loading ? '' 
			: 
			<RequestCard
				email={user.emails[0].address}
				handleAccept={handleAccept}
				handleDecline={handleDecline}
			/>}
		</div>
	);
};

export default withTracker(({userId}) => {
	const userHandle = Meteor.subscribe('searchUserById', userId);
	const loading = !userHandle.ready();
	const user = Meteor.users.findOne({_id: userId});
	console.log("Result user: ", user);
	return {
		loading,
		user,
	}
})(RequestItem);
