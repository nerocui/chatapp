import { Meteor } from 'meteor/meteor';
import { Threads } from './db';
import { isAuthenticated } from '../util/authUtil';

if (Meteor.isServer) {
	Meteor.publish('myThreads', () => Threads.find({users: Meteor.userId()}));
	Meteor.publish('searchThreadById', (_id) => Threads.find({_id}));
}

Meteor.methods({
	'threads.insert'(users) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		return Threads.insert({
			users,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now()),
			lastMessage: '',
		});
	},
	'threads.updateLastMessage'(_id, lastMessage) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		return Threads.update({_id}, {$set: {
			lastMessage,
			updatedAt: new Date(Date.now()),
		}});
	}
});
