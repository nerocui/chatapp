import lf from 'lovefield';
import { APP_NAME, DB_CONFIG } from '../config/app';

const schemaBuilder = lf.schema.create(APP_NAME, 1);

schemaBuilder.createTable(DB_CONFIG.USER_DB_NAME).
	addColumn('_id', lf.Type.STRING).
	addColumn('username', lf.Type.STRING).
	addColumn('first_name', lf.Type.STRING).
	addColumn('last_name', lf.Type.STRING).
	addColumn('initials', lf.Type.STRING).
	addColumn('profile_pic', lf.Type.STRING).
	addPrimaryKey(['_id']);

schemaBuilder.createTable(DB_CONFIG.THREAD_DB_NAME).
	addColumn('_id', lf.Type.STRING).
	addColumn('createdAt', lf.Type.DATE_TIME).
	addColumn('updatedAt', lf.Type.DATE_TIME).
	addColumn('lastMessage', lf.Type.STRING).
	addPrimaryKey(['_id']);

schemaBuilder.createTable(DB_CONFIG.THREAD_USER_REL_DB_NAME).
	addColumn('threadId', lf.Type.STRING).
	addColumn('userId', lf.Type.STRING).
	addForeignKey('fk_threadId', {
		local: 'threadId',
		ref: `${DB_CONFIG.THREAD_DB_NAME}._id`,
		action: lf.ConstraintAction.CASCADE,
		timing: lf.ConstraintTiming.IMMEDIATE
	}).
	addForeignKey('fk_userId', {
		local: 'userId',
		ref: `${DB_CONFIG.USER_DB_NAME}`._id,
		action: lf.ConstraintAction.CASCADE,
		timing: lf.ConstraintTiming.IMMEDIATE
	}).
	addIndex('indexThreadId', ['threadId'], false);


schemaBuilder.createTable(DB_CONFIG.THREAD_USER_REL_DEL_DB_NAME).
	addColumn('threadId', lf.Type.STRING).
	addColumn('userId', lf.Type.STRING).
	addForeignKey('fk_threadId', {
		local: 'threadId',
		ref: `${DB_CONFIG.THREAD_DB_NAME}._id`,
		action: lf.ConstraintAction.CASCADE,
		timing: lf.ConstraintTiming.IMMEDIATE
	}).
	addForeignKey('fk_userId', {
		local: 'userId',
		ref: `${DB_CONFIG.USER_DB_NAME}`._id,
		action: lf.ConstraintAction.CASCADE,
		timing: lf.ConstraintTiming.IMMEDIATE
	}).
	addIndex('indexThreadId', ['threadId'], false);


schemaBuilder.createTable(DB_CONFIG.MESSAGE_THREAD_REL_DB_NAME).
	addColumn('messageId', lf.Type.STRING).
	addColumn('threadId', lf.Type.STRING).
	addForeignKey('fk_messageId', {
		local: 'messageId',
		ref: `${DB_CONFIG.MESSAGE_DB_NAME}._id`,
		action: lf.ConstraintAction.CASCADE,
		timing: lf.ConstraintTiming.IMMEDIATE
	}).
	addForeignKey('fk_threadId', {
		local: 'threadId',
		ref: `${DB_CONFIG.THREAD_DB_NAME}._id`,
		action: lf.ConstraintAction.CASCADE,
		timing: lf.ConstraintTiming.IMMEDIATE
	}).
	addIndex('indexThreadId', ['threadId'], false);


schemaBuilder.createTable(DB_CONFIG.MESSAGE_DB_NAME).
    addColumn('_id', lf.Type.STRING).
    addColumn('readBy', lf.Type.STRING).
    addColumn('content', lf.Type.STRING).
    addColumn('sentAt', lf.Type.DATE_TIME).
    addPrimaryKey(['_id']).
    addIndex('indexSentAt', ['sentAt'], false, lf.Order.DESC);


schemaBuilder.createTable(DB_CONFIG.MESSAGE_USER_REL_DB_NAME).
	addColumn('messageId', lf.Type.STRING).
	addColumn('userId', lf.Type.STRING).
	addForeignKey('fk_messageId', {
        local: 'messageId',
        ref: `${DB_CONFIG.MESSAGE_DB_NAME}._id`,
        action: lf.ConstraintAction.CASCADE,
		timing: lf.ConstraintTiming.IMMEDIATE
	}).
	addForeignKey('fk_userId', {
		local: 'userId',
		ref: `${DB_CONFIG.USER_DB_NAME}._id`,
		action: lf.ConstraintAction.CASCADE,
		timing: lf.ConstraintTiming.IMMEDIATE
	}).
	addIndex('indexMessageId', ['messageId'], false);
