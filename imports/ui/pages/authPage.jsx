import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { withRouter, Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const Input = withStyles({
	root: {
		'& .MuiOutlinedInput-input': {
			width: '20rem',
		},
	},
})(TextField);

class AuthPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailErr: '',
			passwordErr: '',
			err: null,
			mode: 'login'
		}
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onToggleMode = this.onToggleMode.bind(this);
	}

	onEmailChange(e) {
		this.setState({email: e.target.value});
	}

	onPasswordChange(e) {
		this.setState({password: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		if (this.state.mode === 'login') {
			this.props.login({email}, password, err => {
				console.log(err);
			});
		} else {
			this.props.createUser({email, password}, err => {
				console.log(err);
			})
		}
		this.resetState();
	}

	onToggleMode() {
		const {mode} = this.state;
		this.setState({mode: mode === 'login' ? 'signup' : 'login'});
		this.resetState();
	}

	resetState() {
		this.setState({email: '', password: '', emailErr: '', passwordErr: '', err: ''});
	}

	render() {
		if (this.props.loggedIn) {
			return (<Redirect to='/chatlist'/>);
		}
		return (
			<div className="page--authpage-container page">
				{
					this.state.mode === 'login' ?
					(<h1 className="component--authpage_title">Login</h1>) : (<h1 className="component--authpage_title">Signup</h1>)
				}
				<form onSubmit={this.onSubmit} className="component--authpage-form">
					<div className="form-input">
						<Input label="Email" value={this.state.email} onChange={this.onEmailChange} variant="outlined" />
					</div>
					<div className="form-input">
						<Input label="Password" value={this.state.password} onChange={this.onPasswordChange} type="password" variant="outlined" />
					</div>
					<div>
						<Button variant="contained" color="primary" type="submit">{this.state.mode === 'login' ? 'Login' : 'Signup'}</Button>
					</div>
					<div>
						<Button onClick={this.onToggleMode}>{this.state.mode === 'login' ? "Don't have an account? Signup" : "Already have an account? Login"}</Button>
					</div>
				</form>
			</div>
		);
	}
}

const AuthPageContainer =  withTracker(
	() => {
		return {
			loggedIn: Meteor.userId(),
			createUser: Accounts.createUser,
			login: Meteor.loginWithPassword,
		};
	}
)(AuthPage);

export default withRouter(({ history }) => (
	<AuthPageContainer history={history} />
));

