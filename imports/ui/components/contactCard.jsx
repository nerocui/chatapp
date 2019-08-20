import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
	card: {
		width: '100%',
		marginBottom: '1rem',
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

export default function ContactCard(props) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardActionArea onClick={props.onChat}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{`${props.first_name} ${props.last_name}`}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{props.emails[0].address}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
