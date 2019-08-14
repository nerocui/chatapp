import { Meteor } from 'meteor/meteor';
import { isAuthenticated } from '../util/authUtil';

if (Meteor.isServer) {
	Meteor.publish('searchUsers', (email) => {
		if (!email) {
			return [];
		}
		return Meteor.users.find({ "emails.address" : email });
	});
	Meteor.publish('searchUserById', (_id) => {
		if (!_id) {
			return [];
		}
		return Meteor.users.find({ _id });
	});
	Meteor.publish('myFriends', () => {
		const user = Meteor.users.findOne({_id: Meteor.userId()});
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
		const friends = user.friends || [];
		Meteor.users.update(fromUserId, {
			$set: {
				friends: [...friends, toUserId]
			}
		})
	},
});
