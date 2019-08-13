import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";

class SearchResult extends React.Component {
	render() {
		return (
			<div>
				{
					this.props.results.map(result => <div>{result._id}</div>)
				}
			</div>
		);
	}
}

export default withTracker((email) => {
	const resultsHandle = Meteor.subscribe('searchUsers', email);
	const loading = !resultsHandle.ready();
	const results = Meteor.users.find({}).fetch() || [];
	console.log("Here is the result: ", results);
	return {
		results,
		loading,
	}
})(SearchResult);
