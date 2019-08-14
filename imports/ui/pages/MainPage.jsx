import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";
import { Threads, Requests } from '../../api/db';
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
	}

	openSideBar() {
		this.setState({sideBarOpen: true});
	}

	closeSideBar() {
		console.log("called");
		this.setState({sideBarOpen: false});
	}

	render() {
		console.log("requests: ", this.props.requests);
		return (
			<div className='page'>
				<AppBar openMenu={this.openSideBar} requests={this.props.requestsNum}/>
				<SideBar open={this.state.sideBarOpen} requests={this.props.requestsNum} closeSideBar={this.closeSideBar} />
				<div className='component--page__container'>
					<List>
						{this.props.loading ? '' : this.props.threads.map(thread => (
							<Link to={`/chatthread?threadId=${thread._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button>
									<ListItemText primary={thread._id} />
									<ListItemIcon>
										<ArrowRightIcon />
									</ListItemIcon>
								</ListItem>
							</Link>
						))}
					</List>
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	const threadsHandle = Meteor.subscribe('myThreads');
	const loading = !threadsHandle.ready();
	const threads = Threads.find({}).fetch() || [];

	const requestsHandle = Meteor.subscribe('requestsToMe');
	const requestLoading = !requestsHandle.ready();
	const requests = Requests.find({}).fetch() || [];
	return {
		threads,
		loading,
		requestLoading,
		requests,
		requestsNum: requests.length,
	};
})(MainPage);
