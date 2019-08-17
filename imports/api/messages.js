import { Meteor } from 'meteor/meteor';
import { Messages } from './db';
import { isAuthenticated } from '../util/authUtil';

if (Meteor.isServer) {
	Meteor.publish('messageByThread', (threadId) => Messages.find({threadId}));
}

Meteor.methods({
	'messages.send'(threadId, content) {
		if (!isAuthenticated()) {
			throw new Meteor.Error("Not auth");
		}
		let errCode;
		const _id =  Messages.insert({
			senderId: this.userId,
			threadId,
			readBy: [],
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
