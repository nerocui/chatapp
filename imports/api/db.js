import { Mongo } from "meteor/mongo";
export const Requests = new Mongo.Collection('requests');
export const Messages = new Mongo.Collection('messages');
export const Threads = new Mongo.Collection('threads');
