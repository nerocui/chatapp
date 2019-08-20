import React from 'react';
import BackAppBar from '../components/backAppBar';
import ContactCard from '../components/contactCard';
import { withRouter } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor }  from 'meteor/meteor';
import { Threads } from '../../api/db';

class ContactsPage extends React.Component {
	constructor(props) {
		super(props);
		this.buildContactList = this.buildContactList.bind(this);
	}

	chat(contact) {
		this.props.history.push(`/chatthread?threadId=${contact.threadId}`);
	}

	buildContactList() {
		if(this.props.loading) {
			return [];
		} else {
			const contacts = this.props.contacts.filter(contact => contact._id !== Meteor.userId());
			return contacts.map(contact => {
				const thread = this.props.threads.filter(thread => thread.users.includes(contact._id))[0];
				return Object.assign({}, contact, {threadId: thread._id});
			})
		}
	}

	render() {
		const contacts = this.buildContactList();
		return (
			<div className='page'>
				<BackAppBar route='/main' label={this.props.loading?'Loading':'Contacts'}/>
				<div className='component--page__container'>
					{this.props.loading?'':contacts.map(contact => (
							<ContactCard {...contact} key={contact._id} onChat={() => this.chat(contact)}/>
					))}
				</div>
			</div>
		);
	}
}


const ContactsPageWithTracker = withTracker(() => {
	const userHandle = Meteor.subscribe('myFriends');
	const threadHandle = Meteor.subscribe('myThreads');
	const loading = !(userHandle.ready()&& threadHandle.ready());
	return {
		loading,
		contacts: Meteor.users.find({}).fetch() || [],
		threads: Threads.find({}).fetch() || [],
	};
})(ContactsPage);

export default withRouter(({ history }) => (
	<ContactsPageWithTracker history={history} />
));
