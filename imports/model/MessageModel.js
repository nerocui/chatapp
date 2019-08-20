//@flow
import uniqid from 'uniqid';

class Message {
	_id: string;
	readBy: Array<string>;
	senderId: string;
	threadId: string;
	content: string;
	sentAt: Date;

	constructor() {
		this._id = uniqid();
		this.readBy = [];
		return this._id;
	}

	setSenderId(value: string) {
		this.senderId = value;
	}

	setThreadId(value: string) {
		this.threadId = value;
	}

	addReadBy(value: string) {
		this.readBy = [...this.readBy, value];
	}

	setContent(value: string) {
		this.content = value;
	}

	setSentAt(value: Date) {
		this.sentAt = value;
	}

	setAll(senderId: string, threadId: string, content: string) {
		this.setSenderId(senderId);
		this.setThreadId(threadId);
		this.setContent(content);
	}

	send() {
		
	}
}
