import React from 'react';
import Page from './Page';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";

class ContactsPage extends React.Component {
	render() {
		return (
			<Page background="#b94be5">
				<div>
					{this.props.friends.map(friend => (
							<div>
								{friend.email}
							</div>
						))}
				</div>
			</Page>
		);
	}
}

export default withTracker(() => {
	const friendsHandle = Meteor.subscribe('myFriends');
	const loading = !friendsHandle.ready();
	const friends = Meteor.users.find({}).fetch() || [];
	return {
		friends,
		loading,
	};
})(ContactsPage);
