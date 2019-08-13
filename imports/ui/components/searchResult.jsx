import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";

class SearchResult extends React.Component {
	render() {
		return (
			<div>
				{
					this.props.loading ? '' : this.props.result._id
				}
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
