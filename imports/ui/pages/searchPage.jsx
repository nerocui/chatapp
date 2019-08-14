import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SearchResult from '../components/searchResult';
import SearchBar from '../components/searchBar';

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
			return (
				<SearchResult email={this.state.term} />
			);
		}
	}

	render() {
		return (
			<div className='page'>
				<SearchBar email={this.state.email} onChange={this.onEmailChange} onSubmit={this.onSubmit} />
				<div className='component--page__container'>
					{this.renderSearchResult()}
				</div>
			</div>
		);
	}
}

export default SearchPage;
