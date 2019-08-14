import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";
import { Requests } from '../../api/db';
import RequestItem from '../components/requestItem';
import BackAppBar from '../components/backAppBar';

class RequestPage extends React.Component {
	constructor(props) {
		super(props);
		this.onApprove = this.onApprove.bind(this);
		this.onDecline = this.onDecline.bind(this);
	}

	onApprove(request) {
		console.log('called');
		Meteor.call('request.approve', request._id);
	}

	onDecline(request) {
		Meteor.call('request.decline', request._id);
	}

	render() {
		return (
			<div className='page'>
				<BackAppBar route='/main' label='Friend Requests'/>
				<div className='component--page__container'>
					{this.props.loading ? '' : this.props.requests.map(request => (
						<RequestItem
							key={request._id}
							userId={request.fromUserId}
							handleDecline={() => this.onDecline(request)}
							handleAccept={() => this.onApprove(request)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	const requestsHandle = Meteor.subscribe('requestsToMe');
	const loading = !requestsHandle.ready();
	const requests = Requests.find({}).fetch() || [];
	return {
		loading,
		requests,
	};
})(RequestPage);
