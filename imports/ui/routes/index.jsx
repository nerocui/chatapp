import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AuthPage from "../pages/authPage";
import ChatListPage from '../pages/chatListPage';
import ChatThreadPage from '../pages/chatThreadPage';
import MomentsPage from '../pages/momentsPage';
import ContactsListPage from '../pages/contactsPage';
import SearchPage from '../pages/searchPage';
import MePage from '../pages/mePage';
import BottomTab from '../components/bottomTab';
import { isAuthenticated } from "../../util/authUtil";

const routes = (
	<Router>
		<Switch>
			<Route exact path='/' component={AuthPage }/>
			<div>
				<Route
					render={({ location }) => {
						if (!isAuthenticated()) {
							return (
								<Redirect to="/" />
							);
						}
						const { pathname } = location;
						return (
							<TransitionGroup>
								<CSSTransition 
									key={pathname}
									classNames="page"
									timeout={{
										enter: 600,
										exit: 600,
									}}
								>
									<Route
										location={location}
										render={() => (
											<Switch>
												<Route exact path='/chatlist' component={ChatListPage} />
												<Route exact path='/chatthread' component={ChatThreadPage} />
												<Route exact path='/contacts' component={ContactsListPage} />
												<Route exact path='/search' component={SearchPage} />
												<Route exact path='/moments' component={MomentsPage} />
												<Route exact path='/me' component={MePage} />
											</Switch>
										)}
									/>
									</CSSTransition>
							</TransitionGroup>
						);
				}}/>
				<BottomTab/>
			</div>
		</Switch>
	</Router>
)

export default routes;
