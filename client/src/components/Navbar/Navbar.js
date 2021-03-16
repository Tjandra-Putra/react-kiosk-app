import React, { useState, useEffect } from 'react';
import { Navbar, Button, Form, Nav, FormControl, Badge, Modal, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Axios from 'axios';

import './Navbar.css';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import * as actionTypes from '../../store/actions';

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

	// Modal Summary
	const [ show, setShow ] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Retrieving current order summary from database
	const [ orders, setOrders ] = useState([]);

	useEffect(() => {
		Axios.get('http://localhost:3001/api/retrieve-current-order').then((response) => {
			setOrders(response.data);
		});
	}, []);

	let currentOrder = () => {
		orders.map((val, index) => {
			return (
				<tr key={index}>
					<td>{val.prod_name}</td>
					<td>${val.prod_price}</td>
					<td>x {val.prod_quantity}</td>
				</tr>
			);
		});
	};

	// Total Price
	let totalAmount = 0;
	orders.map((item) => {
		totalAmount += item.prod_price * item.prod_quantity;
	});

	return (
		<React.Fragment>
			<Navbar variant="light" className="navbar">
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search"
						style={{ width: '60em' }}
						className="input-search"
						onChange={props.onSearchHandler}
						value={props.searchInputValue}
					/>
				</Form>
				<Nav className="ml-auto">
					<Button variant="light" className="d-inline ml-3 btn">
						Make Payment
					</Button>
					<Button variant="light" className="d-inline ml-3 btn" onClick={handleShow}>
						Receipt
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

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Order Summary</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table borderless hover size="sm">
						<tbody>
							{orders.map((val, index) => {
								return (
									<tr key={index}>
										<td>{val.prod_name}</td>
										<td>${val.prod_price}</td>
										<td>x {val.prod_quantity}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<h6 className="float-right">Total: ${totalAmount.toFixed(2)}</h6>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
};

// STORE
const mapStateToProps = (global_state) => {
	return {
		data: global_state.selectedItems,
		searchInputValue: global_state.searchInputValue
	};
};

// ACTION
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchHandler: (event) => dispatch({ type: actionTypes.SEARCH_PRODUCT_LISTING, event: event })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
