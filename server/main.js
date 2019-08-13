import { Meteor } from 'meteor/meteor';
import '../imports/api/db';
import '../imports/api/messages';
import '../imports/api/requests';
import '../imports/api/threads';
import '../imports/api/user';


Meteor.startup(() => {
  console.log('[[[Server started]]]')
});
