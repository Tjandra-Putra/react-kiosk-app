import React, { useState, useEffect } from 'react';
import { Badge, Container, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Axios from 'axios';

import * as actionTypes from '../../store/actions';
import './SideDrawer.css';
import img_cart from '../../assets/image/abstrakt-design-halloween-2020-4.png';

const sideDrawer = (props) => {
	let drawerClasses = 'side-drawer';
	if (props.show) {
		drawerClasses = 'side-drawer open';
	}

	const [ btnOrderText, setBtnOrderText ] = useState('Order Now');

	let orders = (
		<Container>
			<img src={img_cart} className="img-fluid" />
			<h5>Your cart is empty</h5>
			<p className="text-muted" style={{ fontSize: '0.9rem' }}>
				Looks like you haven't made your choice yet...
			</p>
		</Container>
	);

	// Total Price
	let totalAmount = 0;
	props.data.map((item) => {
		totalAmount += item.prod_price * item.prod_quantity;
	});

	// For dynamic images
	const images = require.context('../../assets/image', true);

	// Passing current state to global state
	props.calculateTotalPrice(totalAmount);

	const submitOrderHandler = () => {
		// Passing data to node.js
		props.data.map((item) => {
			Axios.post('http://localhost:3001/api/insert-customer-order', {
				prod_name: item.prod_name,
				prod_desc: item.prod_desc,
				prod_price: item.prod_price,
				prod_quantity: item.prod_quantity,
				table_id: props.tableId,
				cartId: props.cartId
			}).then(() => {
				alert('successful insert');
			});
		});

		setBtnOrderText('Ordered!');
		console.log('clicked');
	};

	if (props.data.length > 0) {
		orders = (
			<div className="cart-items">
				<Table borderless hover className="table-responsive-sm">
					<tbody>
						{props.data.map((item) => (
							<tr>
								<td>
									<img src={images(`./${item.prod_image}`)} width="30" />
								</td>
								<td>
									{item.prod_name} <br />
									<small className="text-muted"> ${item.prod_price}</small>
								</td>
								<td>
									<div className="d-flex justify-content-center">
										<div className="p-2 bd-highlight">
											<Button
												variant="dark"
												size="sm"
												onClick={() => props.decreaseQuantity(item)}
											>
												-
											</Button>
										</div>
										<div className="p-2 bd-highlight">
											<p>{item.prod_quantity}</p>
										</div>
										<div className="p-2 bd-highlight">
											<Button
												variant="dark"
												size="sm"
												onClick={() => props.increaseQuantity(item)}
											>
												+
											</Button>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<div className="summary">
					<h5>
						<span className="text-muted" style={{ fontWeight: '500', fontSize: '0.8em' }}>
							Total:
						</span>
						${props.totalPrice.toFixed(2)}
					</h5>
					<Button
						variant="success"
						size="lg"
						block
						className="btn-order"
						style={{ width: '100%' }}
						onClick={submitOrderHandler}
					>
						{btnOrderText}
					</Button>
				</div>
			</div>
		);
	}

	return (
		<nav className={drawerClasses}>
			<Container>
				<div className="title text-center mt-3">
					<div className="d-flex justify-content-center">
						<div className="bd-highlight">
							<h4 className="d-inline">Your Orders</h4>
						</div>
						<div className="bd-highlight" style={{ paddingTop: '1.5px' }}>
							<Badge variant="primary" className="ml-2 d-inline">
								{props.data.length}
							</Badge>
						</div>
					</div>
					<hr />
					{orders}
				</div>
			</Container>
		</nav>
	);
};

// STORE
const mapStateToProps = (global_state) => {
	return {
		data: global_state.selectedItems,
		totalPrice: global_state.totalPrice,
		tableId: global_state.tableId,
		cartId: global_state.cartId
	};
};

// ACTION
const mapDispatchToProps = (dispatch) => {
	return {
		increaseQuantity: (prod_obj) =>
			dispatch({
				type: actionTypes.INCREASE_QUANTITY,
				prod_obj: prod_obj
			}),
		decreaseQuantity: (prod_obj) =>
			dispatch({
				type: actionTypes.DECREASE_QUANTITY,
				prod_obj: prod_obj
			}),

		calculateTotalPrice: (totalPrice) =>
			dispatch({ type: actionTypes.CALCULATE_TOTAL_PRICE, total_price: totalPrice })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);
