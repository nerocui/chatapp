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

	render() {
		return (
			<div className='page'>
				<BackAppBar route='/main' label={this.props.loading ? 'loading...' : this.props.thread.name} />
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
