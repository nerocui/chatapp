import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "../pages/authPage";
import ChatThreadPage from '../pages/chatThreadPage';
import MomentsPage from '../pages/momentsPage';
import ContactsListPage from '../pages/contactsPage';
import SearchPage from '../pages/searchPage';
import MePage from '../pages/mePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './PrivateRoute';
import MainPage from '../pages/MainPage';

const routes = (
	<Router>
		<Switch>
			<Route exact path='/' component={AuthPage }/>
			<div>
				<CssBaseline />
				<Switch>
					<PrivateRoute exact path='/main' component={MainPage} />
					<PrivateRoute exact path='/chatthread' component={ChatThreadPage} />
					<PrivateRoute exact path='/contacts' component={ContactsListPage} />
					<PrivateRoute exact path='/search' component={SearchPage} />
					<PrivateRoute exact path='/moments' component={MomentsPage} />
					<PrivateRoute exact path='/me' component={MePage} />
				</Switch>
			</div>
		</Switch>
	</Router>
)

export default routes;
