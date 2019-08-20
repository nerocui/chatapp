import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class SearchResult extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		Meteor.call('request.send', this.props.result._id);
		this.props.onClear();
	}

	render() {
		return (
			<div>
				{this.props.loading ? '' : 
				<Card>
					<CardActionArea>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{`${this.props.result.first_name} ${this.props.result.last_name}`}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{this.props.result.emails[0].address}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button
							size="small"
							color="primary"
							onClick={this.onClick}
						>
							Send Friend Request
						</Button>
					</CardActions>
				</Card>}
			</div>
		);
	}
}

export default withTracker(({email}) => {
	const resultsHandle = Meteor.subscribe('searchUsers', email);
	const loading = !resultsHandle.ready();
	const result = Meteor.users.findOne({ "emails.address" : email });
	return {
		result,
		loading,
		resultsHandle,
	}
})(SearchResult);
