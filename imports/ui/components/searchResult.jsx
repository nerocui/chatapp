import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";

class SearchResult extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		Meteor.call('request.send', this.props.result._id);
	}

	render() {
		return (
			<div>
				{this.props.loading ? '' : this.props.result._id}
				<button onClick={this.onClick}>Send Friend Request</button>
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
	}
})(SearchResult);
