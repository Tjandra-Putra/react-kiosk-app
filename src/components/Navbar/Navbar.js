import React, { useState } from 'react';
import { Navbar, Button, Form, Nav, FormControl, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Navbar.css';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';

const navbar = (props) => {
	const [ sideDrawerOpen, setSideDrawer ] = useState(false);

	const drawerToggleClickHandler = () => {
		setSideDrawer(!sideDrawerOpen);
	};

	const backdropClickHandler = () => {
		setSideDrawer(false);
	};

	let backdrop;

	if (sideDrawerOpen) {
		backdrop = <Backdrop click={backdropClickHandler} />;
	}

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
					<Button variant="light" className="d-inline ml-3 btn" onClick={drawerToggleClickHandler}>
						Orders
						<Badge variant="primary" className="ml-2">
							{props.data.length}
						</Badge>
					</Button>
				</Nav>
			</Navbar>
			<SideDrawer show={sideDrawerOpen} />
			{backdrop}
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
