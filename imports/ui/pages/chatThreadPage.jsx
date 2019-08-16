import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { withTracker } from "meteor/react-meteor-data";
import { Messages, Threads } from '../../api/db';
import BackAppBar from '../components/backAppBar';
import queryString from "query-string";

class ThreadPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
		};
		this.onMessageChange = this.onMessageChange.bind(this);
		this.onMessageSubmit = this.onMessageSubmit.bind(this);
		this.getMessageSender = this.getMessageSender.bind(this);
	}

	onMessageChange(e) {
		this.setState({content: e.target.value});
	}

	onMessageSubmit(e) {
		e.preventDefault();
		Meteor.call('messages.send', this.props.thread._id, this.state.content);
		this.setState({content: ''});
	}

	getMessageSender(senderId) {
		if (senderId === this.props.user._id) {
			return this.props.user;
		}
		console.log("getting sender with id: ", senderId);
		return this.props.contacts.filter(contact => contact._id === senderId)[0];
	}

	render() {
		return (
			<div className='page'>
				<BackAppBar route='/main' label={this.props.loading ? 'loading...' : this.props.thread.name} />
				<div className='component--page__container'>
					{this.props.loading ? '' : this.props.messages.map(message => {
						const messageData = Object.assign({}, message, {sender: this.getMessageSender(message.senderId)});
						console.log('got sender, whole message data is: ', messageData);
						return (
							<p>{`${messageData.sender.username}: ${messageData.content}`}</p>
						);
					})}
					<div>
						<form onSubmit={this.onMessageSubmit}>
							<input value={this.state.content} onChange={this.onMessageChange}/>
							<button type='submit'>Send</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.auth.user,
		contacts: state.contactState.openedThreadContacts,
		thread: state.threadState.openedThread,
	};
}

const ConnectedThreadPage = connect(mapStateToProps)(ThreadPage);

export default withTracker(() => {
	const threadId = queryString.parse(window.location.search).threadId;
	const messageHandle = Meteor.subscribe('messageByThread', threadId);
	const loading = !messageHandle.ready();
	const messages = Messages.find({}).fetch() || [];
	return {
		loading,
		messages,
	};
})(ConnectedThreadPage);
