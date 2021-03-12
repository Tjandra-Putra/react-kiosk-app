import React from 'react';
import './Navbar.css';

import { Navbar, Button, Form, Nav, FormControl, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const navbar = (props) => {
	return (
		<React.Fragment>
			<Navbar variant="light" className="navbar">
				<Form inline>
					<FormControl type="text" placeholder="Search" style={{ width: '60em' }} className="input-search" />
				</Form>
				<Nav className="ml-auto">
					<Button variant="light" className="d-inline ml-3 btn">
						Call Waiters
					</Button>
					<Button variant="light" className="d-inline ml-3 btn">
						Orders
						<Badge variant="primary" className="ml-2">
							{props.data.length}
						</Badge>
					</Button>
				</Nav>
			</Navbar>
		</React.Fragment>
	);
};

// STORE
const mapStateToProps = (global_state) => {
	return {
		data: global_state.selectedItems
	};
};

export default connect(mapStateToProps)(navbar);
