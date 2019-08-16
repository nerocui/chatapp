import React from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";
import { withRouter, Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const Input = withStyles({
	root: {
		'& .MuiOutlinedInput-input': {
			width: '20rem',
		},
	},
})(TextField);

class SignupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailErr: '',
			passwordErr: '',
			err: null,
		}
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onFirstNameChange = this.onFirstNameChange.bind(this);
		this.onLastNameChange = this.onLastNameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onFirstNameChange(e) {
		this.setState({first_name: e.target.value});
	}

	onLastNameChange(e) {
		this.setState({last_name: e.target.value});
	}

	onEmailChange(e) {
		this.setState({email: e.target.value});
	}

	onPasswordChange(e) {
		this.setState({password: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const {email, password, first_name, last_name} = this.state;
		this.props.createUser({email, password, first_name, last_name }, err => {
			console.log(err);
		});
		this.resetState();
	}

	resetState() {
		this.setState({email: '', password: '', emailErr: '', passwordErr: '', err: ''});
	}

	render() {
		if (this.props.loggedIn) {
			return (<Redirect to='/main'/>);
		}
		return (
			<div className="page--authpage-container page">
				<h1 className="component--signuppage_title">Signup</h1>
				<form onSubmit={this.onSubmit} className="component--authpage-form">
					<div className="form-input">
						<Input label="Email" value={this.state.email} onChange={this.onEmailChange} variant="outlined" />
					</div>
					<div className="form-input">
						<Input label="First Name" value={this.state.first_name} onChange={this.onFirstNameChange} variant="outlined" />
					</div>
					<div className="form-input">
						<Input label="Last Name" value={this.state.last_name} onChange={this.onLastNameChange} variant="outlined" />
					</div>
					<div className="form-input">
						<Input label="Password" value={this.state.password} onChange={this.onPasswordChange} type="password" variant="outlined" />
					</div>
					<div>
						<Button variant="contained" color="primary" type="submit">Signup</Button>
					</div>
					<div>
						<Link to='/'>
							<Button onClick={this.onToggleMode}>Already have an account? Login</Button>
						</Link>
					</div>
				</form>
			</div>
		);
	}
}

const SignupPageContainer =  withTracker(
	() => {
		return {
			loggedIn: Meteor.userId(),
			createUser: Accounts.createUser,
		};
	}
)(SignupPage);

export default withRouter(({ history }) => (
	<SignupPageContainer history={history} />
));

