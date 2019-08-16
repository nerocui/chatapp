import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '../components/appBar';
import SideBar from '../components/sideBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemText from '@material-ui/core/ListItemText';


class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sideBarOpen: false,
		}
		this.openSideBar = this.openSideBar.bind(this);
		this.closeSideBar = this.closeSideBar.bind(this);
	}

	openSideBar() {
		this.setState({sideBarOpen: true});
	}

	closeSideBar() {
		console.log("called");
		this.setState({sideBarOpen: false});
	}

	render() {
		console.log("requests: ", this.props.requests);
		return (
			<div className='page'>
				<AppBar openMenu={this.openSideBar} requests={this.props.requests.length}/>
				<SideBar open={this.state.sideBarOpen} requests={this.props.requests.length} closeSideBar={this.closeSideBar} />
				<div className='component--page__container'>
					<List>
						{this.props.threads.map(thread => (
							<Link
								to={`/chatthread?threadId=${thread._id}`}
								style={{ textDecoration: 'none', color: 'inherit' }}
								key={thread._id}
							>
								<ListItem button>
									<ListItemText primary={thread._id} />
									<ListItemIcon>
										<ArrowRightIcon />
									</ListItemIcon>
								</ListItem>
							</Link>
						))}
					</List>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		threads: state.threadState.threads,
		requests: state.requestState.requests,
	};
}

export default connect(mapStateToProps)(MainPage);
