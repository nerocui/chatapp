import React from 'react';
import Page from './Page';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";
import { Threads } from '../../api/db';
import BottomAppBar from '../components/appBar';


class MainPage extends React.Component {

	render() {
		
		return (
			<Page background="#e5b24b">
				<div>chat list page</div>
				<BottomAppBar />
			</Page>
		);
	}
}

export default withTracker(() => {
	const threadsHandle = Meteor.subscribe('myThreads');
	const loading = !threadsHandle.ready();
	const threads = Threads.find({}).fetch() || [];
	return {
		threads,
		loading,
	};
})(MainPage);
