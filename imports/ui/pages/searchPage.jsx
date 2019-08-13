import React from 'react';
import Page from './Page';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SearchResult from '../components/searchResult';

const Input = withStyles({
	root: {
		'& .MuiOutlinedInput-input': {
			width: '20rem',
		},
	},
})(TextField);

class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			search: false,
			term: '',
		}
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.renderSearchResult = this.renderSearchResult.bind(this);
	}

	onEmailChange(e) {
		this.setState({email: e.target.value, search: false, term: ''});
	}

	onSubmit(e) {
		e.preventDefault();
		const term = this.state.email;
		this.setState({search: true, email: '', term});
	}

	renderSearchResult() {
		if (this.state.search) {
			console.log("rendering result");
			return (
				<SearchResult email={this.state.term} />
			);
		}
		console.log('not rending result');
	}

	render() {
		return (
			<Page background="#4f6572">
				<form onSubmit={this.onSubmit}>
					<Input
						label="Search by Email"
						value={this.state.email}
						onChange={this.onEmailChange}
						variant="outlined"
					/>
					<Button
						variant="contained"
						color="primary"
						type="submit"
					>
						Search
					</Button>
				</form>
				{this.renderSearchResult()}
			</Page>
		);
	}
}

export default SearchPage;
