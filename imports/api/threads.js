import { Meteor } from 'meteor/meteor';
import { Threads } from './db';

if (Meteor.isServer) {
	Meteor.publish('myThreads', () => Threads.find({senderId: this.userId}));
}

Meteor.methods({
	'threads.insert'(receiverId, senderId) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		return Threads.insert({
			receiverId,
			senderId,
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
