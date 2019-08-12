import { Meteor } from 'meteor/meteor';
import { isAuthenticated } from '../util/authUtil';

if (Meteor.isServer) {
	Meteor.publish('searchUsers', (email) => Meteor.users.find({email}));
	Meteor.publish('myFriends', () => {
		const user = Meteor.users.findOne({_id: this.userId});
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
