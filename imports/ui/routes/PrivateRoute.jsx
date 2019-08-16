import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.renderRoute = this.renderRoute.bind(this);
	}

	renderRoute() {
		const COMPONENT = this.props.component;
		console.log("doing auth");
		if (this.props.loggedIn) {
			console.log('returning component: ', COMPONENT);
			return <COMPONENT />;
		} else {
			console.log('redirecting to /');
			return <Redirect to="/" />;
		}
	}

	render() {
		const { component, ...rest } = this.props;
		return (
			<Route {...rest} render={this.renderRoute} />
		);
	}
}


function mapStateToProps(state) {
	console.log('mapping state to props', state);
	return {
		loggedIn: state.auth.loggedIn
	};
}

export default connect(mapStateToProps)(PrivateRoute);
