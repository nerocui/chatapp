import React from 'react';
import { connect } from 'react-redux';
import BackAppBar from '../components/backAppBar';
import ContactCard from '../components/contactCard';

class ContactsPage extends React.Component {
	render() {
		return (
			<div className='page'>
				<BackAppBar route='/main' label='Contacts'/>
				<div className='component--page__container'>
					{this.props.contacts.map(contact => (
							<ContactCard {...contact} key={contact._id}/>
						))}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		contacts: state.contactState.contacts,
	};
}

export default connect(mapStateToProps)(ContactsPage);
