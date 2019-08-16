import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from '../App';
import rootReducer from "../../reducer/index";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(rootReducer);

const routes = (
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);

export default routes;
