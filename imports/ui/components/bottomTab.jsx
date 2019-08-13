import React from 'react';
import { withRouter, Link } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatIconOutline from '@material-ui/icons/ChatBubbleOutline';
import ContactIconOutline from '@material-ui/icons/ContactsOutlined';
import SearchIconOutline from '@material-ui/icons/SearchOutlined';
import MomentIconOutline from '@material-ui/icons/ShareOutlined';
import MeIconOutline from '@material-ui/icons/PersonOutline';
import ChatIcon from '@material-ui/icons/ChatBubble';
import ContactIcon from '@material-ui/icons/Contacts';
import SearchIcon from '@material-ui/icons/Search';
import MomentIcon from '@material-ui/icons/Share';
import MeIcon from '@material-ui/icons/Person';

const tabs = [
	'chatlist',
	'contacts',
	'search',
	'moments',
	'me',
];

const icons = {
	chatlist: {
		icon: ChatIcon,
		iconOutline: ChatIconOutline,
	},
	contacts: {
		icon: ContactIcon,
		iconOutline: ContactIconOutline,
	},
	search: {
		icon: SearchIcon,
		iconOutline: SearchIconOutline,
	},
	moments: {
		icon: MomentIcon,
		iconOutline: MomentIconOutline,
	},
	me: {
		icon: MeIcon,
		iconOutline: MeIconOutline,
	}
}

class BottomTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: tabs[0],
		}
		this.handleChange = this.handleChange.bind(this);
		this.getIcon = this.getIcon.bind(this);
		this.getIconChosen = this.getIconChosen.bind(this);
		this.getIconOutline = this.getIconOutline.bind(this);
	}

	handleChange(event, newValue) {
		this.props.history.push({
			pathname: `/${newValue}`,
		});
		this.setState({tab: newValue});
	}

	getIconChosen(value) {
		const Icon = icons[value].icon;
		return <Icon />;
	}

	getIconOutline(value) {
		const Icon = icons[value].iconOutline;
		return <Icon />;
	}

	getIcon(value) {
		if (this.state.tab === value) {
			return this.getIconChosen(value);
		} else {
			return this.getIconOutline(value);
		}
	}

	render() {
		return (
			<div className="component--bottom-tab">
				<Tabs value={this.state.tab} onChange={this.handleChange} variant="fullWidth">
					<Tab label="Chats" icon={this.getIcon('chatlist')} value={tabs[0]} />
					<Tab label="Contacts" icon={this.getIcon('contacts')} value={tabs[1]} />
					<Tab label="Search" icon={this.getIcon('search')} value={tabs[2]} />
					<Tab label="Moments" icon={this.getIcon('moments')} value={tabs[3]} />
					<Tab label="Me" icon={this.getIcon('me')} value={tabs[4]} />
				</Tabs>
			</div>
		);
	}
}

export default withRouter(({ history }) => (
	<BottomTab history={history} />
));
