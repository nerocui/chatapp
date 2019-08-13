import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";
import { Threads } from '../../api/db';
import AppBar from '../components/appBar';
import SideBar from '../components/sideBar';


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
		return (
			<div className='page'>
				<AppBar openMenu={this.openSideBar}/>
				<SideBar open={this.state.sideBarOpen} closeSideBar={this.closeSideBar} />
				<div className='component--main-page__container'>chat list page</div>
			</div>
		);
	}
}

export default withTracker(() => {
	const threadsHandle = Meteor.subscribe('myThreads');
	const loading = !threadsHandle.ready();
	const threads = Threads.find({}).fetch() || [];
	return {
		threads,
		loading,
	};
})(MainPage);
