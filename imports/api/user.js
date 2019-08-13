import { Meteor } from 'meteor/meteor';
import { isAuthenticated } from '../util/authUtil';
import {Accounts} from 'meteor/accounts-base';

if (Meteor.isServer) {
	Meteor.publish('searchUsers', (email) => {
		if (!email) {
			return [];
		}
		const users = Meteor.users.find({ "emails.address" : email });
		return users;
	});
	Meteor.publish('myFriends', () => {
		const user = Meteor.users.findOne({_id: this.userId});
		if (!user) {
			return [];
		}
		return Meteor.users.find({_id: {$in: user.friends}});
	});
}

Meteor.methods({
	'users.addFriend'(fromUserId, toUserId) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		const user = Meteor.users.findOne({_id: fromUserId});
		Meteor.users.update(fromUserId, {
			$set: {
				friends: [...user.friends, toUserId]
			}
		})
	},
});
