import { Meteor } from "meteor/meteor";
import { Requests } from './db';
import { isAuthenticated } from '../util/authUtil';

if (Meteor.isServer) {
	Meteor.publish('requestsToMe', () => Requests.find({toUserId: Meteor.userId()}));
	Meteor.publish('requestsFromMe', () => Requests.find({fromUserId: Meteor.userId()}));
}

Meteor.methods({
	'request.send'(toUserId) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		return Requests.insert({
			fromUserId: this.userId,
			toUserId,
		});
	},
	'request.approve'(_id) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		const request = Requests.findOne({_id});
		Requests.remove({_id});
		Meteor.call('users.addFriend', request.fromUserId, request.toUserId);
		Meteor.call('users.addFriend', request.toUserId, request.fromUserId);
	},
	'request.decline'(_id) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		Requests.remove({_id});
	}
});
