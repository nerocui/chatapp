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
			deletedBy: [],
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now()),
			lastMessage: '',
		});
	},
	'threads.updateLastMessage'(_id, lastMessage) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		console.log('updating last message: ', lastMessage);
		return Threads.update({_id}, {$set: {
			lastMessage,
			deletedBy: [],//if new message, this needs to be seen by all users
			updatedAt: new Date(Date.now()),
		}});
	},
	'threads.messageReadBy'(_id, messageId, readerId) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		//get the message, then get message.readBy list
		//add readerId to the list if not already on it
		//check if that's all users from the thread
		//if so, delete the message from server
	},
	'threads.deleteThread'(_id, userId) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		//get the thread
		//add the deleterId to the deletedBy list
		//if deletedBy list is same as users list, delete the thread
	}
});
