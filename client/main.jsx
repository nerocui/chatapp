import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import routes from '../imports/ui/routes';

Meteor.startup(() => {
  render(routes, document.getElementById('react-target'));
});
