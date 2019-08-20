import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { withTracker } from "meteor/react-meteor-data";
import { Messages, Threads } from '../../api/db';
import BackAppBar from '../components/backAppBar';
import queryString from "query-string";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';


class ThreadPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
		};
		this.onMessageChange = this.onMessageChange.bind(this);
		this.onMessageSubmit = this.onMessageSubmit.bind(this);
		this.getMessageSender = this.getMessageSender.bind(this);
		this.getThreadName = this.getThreadName.bind(this);
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
		console.log("getting sender with id: ", senderId);
		return this.props.contacts.filter(contact => contact._id === senderId)[0];
	}

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	getThreadName() {
		const {users} = this.props.thread;
		const contacts = this.props.contacts.filter(contact => users.includes(contact._id) && contact._id !== this.props.user._id);
		return contacts.length > 1 ? `Group of ${contacts.length.toString()}` : `${contacts[0].first_name} ${contacts[0].last_name}`;
	}

	render() {
		return (
			<div className='page'>
				<BackAppBar route='/main' label={this.props.loading ? 'loading...' : this.getThreadName()} />
				<div className='component--page__container'>
					<div className='component--thread__message-container'>
						{this.props.loading ? '' : this.props.messages.map(message => {
							const messageData = Object.assign({}, message, {sender: this.getMessageSender(message.senderId)});
							console.log('got sender, whole message data is: ', messageData);
							return (
								<div className='component--thread__chat'>
									<Avatar className={`element--thread__chat-float ${messageData.sender._id === this.props.user._id ? 'right' : ''}`}>{messageData.sender.initials}</Avatar>
									<p className={`element--thread__chat-float ${messageData.sender._id === this.props.user._id ? 'right' : ''}`}>{messageData.content}</p>
								</div>
								
							);
						})}
					</div>
					<div style={{ float:"left", clear: "both" }}
						ref={(el) => { this.messagesEnd = el; }}>
					</div>
					<div className='component--thread__input-container'>
						<form onSubmit={this.onMessageSubmit}>
							<TextField
								id="standard-bare"
								margin="normal"
								inputProps={{
									autocomplete: "off",
									form: {
									autocomplete: "off",
								}}}
								value={this.state.content} onChange={this.onMessageChange}
							/>
							<IconButton type='submit'>
								<SendIcon />
							</IconButton>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	const threadId = queryString.parse(window.location.search).threadId;
	const threadHandle = Meteor.subscribe('searchThreadById', threadId);
	const messageHandle = Meteor.subscribe('messageByThread', threadId);
	const loading = !messageHandle.ready();
	const threadLoding = !threadHandle.ready();
	const thread = Threads.findOne({_id: threadId});
	const messages = Messages.find({}).fetch() || [];
	const contactsHandle = Meteor.subscribe('getUserByThread', threadId);
	const contactsLoading = !contactsHandle.ready();
	const contacts = Meteor.users.find({}).fetch() || [];
	return {
		thread,
		loading: loading || threadLoding || contactsLoading,
		messages,
		contacts,
		user: Meteor.user(),
	};
})(ThreadPage);
