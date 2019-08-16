import React from 'react';
import { Meteor } from 'meteor/meteor';
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
	}

	onMessageChange(e) {
		this.setState({content: e.target.value});
	}

	onMessageSubmit(e) {
		e.preventDefault();
		Meteor.call('messages.send', this.props.threadId, this.props.thread.users.filter(user => user._id !== Meteor.userId())[0], this.state.content);
		this.setState({content: ''});
	}

	render() {
		return (
			<div className='page'>
				<BackAppBar route='/main' label={this.props.loading ? 'loading...' : this.props.thread._id} />
				<div className='component--page__container'>
					{this.props.loading ? '' : this.props.messages.map(message => <p>{`${message.senderId}: ${message.content}`}</p>)}
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

export default withTracker(() => {
	const threadId = queryString.parse(window.location.search).threadId;
	const messageHandle = Meteor.subscribe('messageByThread', threadId);
	const loading = !messageHandle.ready();
	const messages = Messages.find({}).fetch() || [];

	const threadHandle = Meteor.subscribe('searchThreadById', threadId);
	const threadLoading = !threadHandle.ready();
	const thread = Threads.findOne({_id: threadId});
	return {
		threadId,
		threadLoading,
		thread,
		loading,
		messages,
	};
})(ThreadPage);
