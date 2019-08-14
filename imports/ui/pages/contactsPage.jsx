import React from 'react';
import Page from './Page';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";
import BackAppBar from '../components/backAppBar';
import ContactCard from '../components/contactCard';

class ContactsPage extends React.Component {
	render() {
		return (
			<div className='page'>
				<BackAppBar route='/main' label='Contacts'/>
				<div className='component--page__container'>
					{this.props.friends.map(friend => (
							<ContactCard {...friend}/>
						))}
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	const friendsHandle = Meteor.subscribe('myFriends');
	const loading = !friendsHandle.ready();
	const friends = Meteor.users.find({}).fetch().filter(user => user._id !== Meteor.userId()) || [];
	return {
		friends,
		loading,
	};
})(ContactsPage);
