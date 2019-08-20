import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { chat } from '../../action';
import AppBar from '../components/appBar';
import SideBar from '../components/sideBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemText from '@material-ui/core/ListItemText';


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

	render() {
		console.log("requests: ", this.props.requests);
		const requestNum = this.props.requests ? this.props.requests.length : 0;

		return (
			<div className='page'>
				<AppBar openMenu={this.openSideBar} requests={requestNum}/>
				<SideBar open={this.state.sideBarOpen} requests={requestNum} closeSideBar={this.closeSideBar} />
				<div className='component--page__container'>
					<List>
						{this.props.threads.map(thread => {
							const threadData = Object.assign({}, thread, {name: this.getThreadName(thread)});
							return (
								<ListItem button key={thread._id} onClick={() => this.openThread(threadData)}>
									<ListItemText primary={threadData.name} />
									<ListItemIcon>
										<ArrowRightIcon />
									</ListItemIcon>
								</ListItem>
							);
						})}
					</List>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		chat: thread => dispatch(chat(thread)),
	};
}

function mapStateToProps(state) {
	return {
		user: state.auth.user,
		threads: state.threadState.threads,
		requests: state.requestState.requests,
		contacts: state.contactState.contacts,
	};
}

const ConnectedMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default withRouter(({ history }) => (
	<ConnectedMainPage history={history} />
));
