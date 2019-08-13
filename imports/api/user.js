import { Meteor } from 'meteor/meteor';
import { isAuthenticated } from '../util/authUtil';

if (Meteor.isServer) {
	Meteor.publish('searchUsers', (email) => {
		if (!email) {
			return [];
		}
		return Meteor.users.find({ "emails.address" : email });
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
