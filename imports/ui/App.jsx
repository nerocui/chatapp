import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data"
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { setAuthInfo, logout } from '../action';
import * as db from '../api/db';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './routes/PrivateRoute';

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
			this.props.setAuthInfo(this.props.user);
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
							<PrivateRoute exact path='/main' component={MainPage} />
							<PrivateRoute exact path='/chatthread' component={ChatThreadPage} />
							<PrivateRoute exact path='/contacts' component={ContactsListPage} />
							<PrivateRoute exact path='/requests' component={RequestPage} />
							<PrivateRoute exact path='/search' component={SearchPage} />
							<PrivateRoute exact path='/moments' component={MomentsPage} />
							<PrivateRoute exact path='/me' component={MePage} />
							<PrivateRoute component={MainPage} />
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
		contacts = Meteor.users.find({}).fetch().filter(user => user._id !== Meteor.userId()) || [];

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
		logout: () => dispatch(logout()),
	};
}

export default connect(null, mapDispatchToProps)(AppWithTracker);
