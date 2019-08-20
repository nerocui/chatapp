import { Meteor } from 'meteor/meteor';
import { isAuthenticated } from '../util/authUtil';
import { Threads } from './db';

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
		const users = [...user.friends, Meteor.userId()];
		return Meteor.users.find({_id: {$in: users}});
	});
	Meteor.publish('getUserByThread', (threadId) => {
		const thread = Threads.findOne({_id: threadId});
		return Meteor.users.find({_id: {$in: thread.users}});
	});

	Meteor.users.deny({
		update() { return true; }
	});
}

Accounts.onCreateUser((options, user) => {
	console.log("[backend onCreateUser]", options, user);
	const { first_name, last_name, profile_pic } = options;
	user.initials = first_name[0].toUpperCase() + last_name[0].toUpperCase();
	user.first_name = first_name;
	user.last_name = last_name;
	user.profile_pic = profile_pic;
	let username = first_name + last_name[0];
	let accepted = !Meteor.users.findOne({username});
	let count = 1;
	while (!accepted) {
		username = username + count.toString();
		accepted = !Meteor.users.findOne({username});
		count += 1;
	}
	user.username = username;
	return user;
});

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
