import React from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";
import { Threads, Requests } from '../../api/db';
import AppBar from '../components/appBar';
import SideBar from '../components/sideBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sideBarOpen: false,
		}
		this.openSideBar = this.openSideBar.bind(this);
		this.closeSideBar = this.closeSideBar.bind(this);
		this.openThread = this.openThread.bind(this);
	}

	openSideBar() {
		this.setState({sideBarOpen: true});
	}

	closeSideBar() {
		console.log("called");
		this.setState({sideBarOpen: false});
	}

	openThread(thread) {
		//this.props.chat(thread);
		console.log("setting thread data: ", thread);
		this.props.history.push(`/chatthread?threadId=${thread._id}`);
	}

	getThreadName(thread) {
		const {users} = thread;
		const contacts = this.props.contacts.filter(contact => users.includes(contact._id) && contact._id !== this.props.user._id);
		return contacts.length > 1 ? `Group of ${contacts.length.toString()}` : `${contacts[0].first_name} ${contacts[0].last_name}`;
	}

	getAvatar(thread) {
		const {users} = thread;
		const contacts = this.props.contacts.filter(contact => users.includes(contact._id) && contact._id !== this.props.user._id);
		return contacts.length > 1 ? `G${contacts.length.toString()}` : `${contacts[0].initials}`;
	}

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({behavior: 'auto'});
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	render() {
		console.log("requests: ", this.props.requests);
		const requestNum = this.props.requests ? this.props.requests.length : 0;

		return (
			<div className='page'>
				<AppBar openMenu={this.openSideBar} requests={requestNum}/>
				<SideBar open={this.state.sideBarOpen} requests={requestNum} closeSideBar={this.closeSideBar} />
				<div className='component--page__container'>
					{this.props.loading? 
						<div style={{ float:"left", clear: "both" }}
							ref={(el) => { this.messagesEnd = el; }}>
						</div> :
						<List>
							<div style={{ float:"left", clear: "both" }}
								ref={(el) => { this.messagesEnd = el; }}>
							</div>
							{this.props.threads.map(thread => {
								const threadData = Object.assign(
										{},
										thread, 
										{name: this.getThreadName(thread), avatar: this.getAvatar(thread)}
									);
									console.log("threads: ", threadData);
								return (
									<ListItem button key={thread._id} onClick={() => this.openThread(threadData)}>
										<ListItemAvatar>
											<Avatar>{threadData.avatar}</Avatar>
										</ListItemAvatar>
										<ListItemText primary={threadData.name} secondary={threadData.lastMessage}/>
										<ListItemIcon>
											<ArrowRightIcon />
										</ListItemIcon>
									</ListItem>
								);
							})}
						</List>
					}
				</div>
			</div>
		);
	}
}


const MainPageWithTracker = withTracker(() => {
	const threadHandle = Meteor.subscribe('myThreads');
	const requestHandle = Meteor.subscribe('requestsToMe');
	const contactHandle = Meteor.subscribe('myFriends');

	const loading = !(threadHandle.ready() && requestHandle.ready() && contactHandle.ready());
	const threads = Threads.find({}).fetch() || [];
	const requests = Requests.find({}).fetch() || [];
	const contacts = Meteor.users.find({}).fetch() || [];

	return {
		loading,
		user: Meteor.user(),
		threads,
		requests,
		contacts,
	};
})(MainPage);

export default withRouter(({ history }) => (
	<MainPageWithTracker history={history} />
));
