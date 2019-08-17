import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data"
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import {
	setAuthInfo,
	logout,
	setContacts,
	setRequests,
	setThreads,
} from '../action';
import * as db from '../api/db';
import CssBaseline from '@material-ui/core/CssBaseline';

import ChatThreadPage from './pages/chatThreadPage';
import MomentsPage from './pages/momentsPage';
import ContactsListPage from './pages/contactsPage';
import SearchPage from './pages/searchPage';
import MePage from './pages/mePage';
import MainPage from './pages/MainPage';
import RequestPage from './pages/RequestPage';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

class App extends Component {
	componentDidMount() {
		if (this.props.loggedIn) {
			console.log('did mount');
			this.props.setAuthInfo(this.props.user);
			if (!this.props.loading) {
				this.props.setContacts(this.props.contacts);
				this.props.setThreads(this.props.threads);
				this.props.setRequests(this.props.requests);
			}
		} else {
			this.props.logout();
		}
	}

	componentDidUpdate() {
		if (this.props.loggedIn) {
			console.log('did update');
			this.props.setAuthInfo(this.props.user);
			if (!this.props.loading) {
				this.props.setContacts(this.props.contacts);
				this.props.setThreads(this.props.threads);
				this.props.setRequests(this.props.requests);
			}
			console.log('finished update');
		} else {
			this.props.logout();
		}
	}

	render() {
		if (this.props.loggedIn) {
			console.log("logged in");
			return (
				<Router>
					<div>
						<CssBaseline />
						<Switch>
							<Route exact path='/main' component={MainPage} />
							<Route exact path='/chatthread' component={ChatThreadPage} />
							<Route exact path='/contacts' component={ContactsListPage} />
							<Route exact path='/requests' component={RequestPage} />
							<Route exact path='/search' component={SearchPage} />
							<Route exact path='/moments' component={MomentsPage} />
							<Route exact path='/me' component={MePage} />
							<Route component={MainPage} />
						</Switch>
					</div>
				</Router>
			);
		} else {
			console.log("logged out");
			return (
				<Router>
					<Switch>
						<Route exact path='/' component={LoginPage} />
						<Route exact path='/signup' component={SignupPage} />
						<Route component={LoginPage} />
					</Switch>
				</Router>
			);
		}
		
	}
}

const AppWithTracker = withTracker(() => {
	let contactsHandle = null;
	let contactsLoading = true;
	let contacts = [];
	
	let threadsHandle = null;
	let threadsLoading = true;
	let threads = [];

	let requestsHandle = null;
	let requestsLoading = true;
	let requests = [];

	if (Meteor.userId()) {
		contactsHandle = Meteor.subscribe('myFriends');
		contactsLoading = !contactsHandle.ready();
		contacts = Meteor.users.find({}).fetch() || [];

		threadsHandle = Meteor.subscribe('myThreads');
		threadsLoading = !threadsHandle.ready();
		threads = db.Threads.find({}).fetch() || [];

		requestsHandle = Meteor.subscribe('requestsToMe');
		requestsLoading = !requestsHandle.ready();
		requests = db.Requests.find({}).fetch() || [];
	}

	return {
		user: Meteor.user(),
		loggedIn: !!Meteor.userId(),
		loading: contactsLoading || threadsLoading || requestsLoading,
		contacts,
		threads,
		requests,
	};
})(App);

function mapDispatchToProps(dispatch) {
	return {
		setAuthInfo: user => dispatch(setAuthInfo(user)),
		setContacts: contacts => dispatch(setContacts(contacts)),
		setThreads: threads => dispatch(setThreads(threads)),
		setRequests: requests => dispatch(setRequests(requests)),
		logout: () => dispatch(logout()),
	};
}

export default connect(null, mapDispatchToProps)(AppWithTracker);
