import React from 'react';
import {Tracker} from 'meteor/tracker';
import { withRouter } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { Button } from '@material-ui/core';
import { Meteor } from 'meteor/meteor';
import Page from './Page';

class MePage extends React.Component {
	constructor(props) {
		super(props);
		this.onLogout = this.onLogout.bind(this);
	}

	componentDidMount() {
		this.tracker = Tracker.autorun(() => {
			if (!Meteor.userId()) {
				//use Tracker autorun implementation, can switch to withTracker
				//container implementation is this method becomes unreliable
				this.props.history.push('/');
			}
		})
	}

	componentWillUnmount() {
		this.tracker.stop();
	}

	onLogout() {
		Accounts.logout();
	}

	render() {
		return (
			<Page background="#4be59b">
				<div>
					<Button onClick={this.onLogout}>Log Out</Button>
				</div>
			</Page>
		);
	}
}

export default withRouter(({ history }) => (
	<MePage history={history} />
));
