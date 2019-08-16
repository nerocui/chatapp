import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from '../imports/reducer';

const store = createStore(rootReducer);

Meteor.startup(() => {
  render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('react-target'));
});
