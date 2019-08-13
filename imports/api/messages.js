import { Meteor } from 'meteor/meteor';
import { Messages, Threads } from './db';

if (Meteor.isServer) {
	Meteor.publish('messageByThread', (threadId) => Messages.find({threadId}));
}

Meteor.methods({
	'messages.send'(receiverId, content) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		const thread = Threads.findOne({receiverId, senderId: this.userId});
		let errCode;
		const _id =  Messages.insert({
			senderId: this.userId,
			receiverId,
			threadId: thread._id,
			content,
			read: false,
			receivedAt: new Date(Date.now()),
		}, err => {
			errCode = err;
		});
		if (errCode) {
			Meteor.call('threads.updateLastMessage', thread._id, content);
		}
		return _id;
	},
	'messages.read'(receiverId) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		return Messages.update({receiverId}, {$set: {
			read: true,
		}});
	}
});
